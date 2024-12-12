const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class authController {
    //[POST] /auth/signup
    async signUpUser(req, res){
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Kiểm tra username/email đã tồn tại
            const existingUser = await User.findOne({ username: req.body.username });
            if (existingUser) {
                return res.status(400).json("Username already exists");
            }

            const existingEmail = await User.findOne({ email: req.body.email });
            if (existingEmail) {
                return res.status(400).json("Email already exists");
            }

            // Create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //[POST] /auth/login
    async logInUser(req, res){
        try {
            // (1) Tìm người dùng trong database
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Wrong username");
            }

            // (2) Kiểm tra mật khẩu
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Wrong password");
            }

            // (3) Tạo token
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '20s' } // Access token hết hạn sau 300 giây (5 phút)
            );

            const refreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '365d' } // Refresh token hết hạn sau 365 ngày
            );
               // Lưu Refresh Token vào database
            user.refreshTokens.push(refreshToken);
            await user.save();

            // Cài đặt Refresh Token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // Chỉ nên bật khi sử dụng HTTPS
                path: "/",
                sameSite: "strict",
            });

            // Trả về user và access token
            return res.status(200).json({ user, accessToken });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async requestRefreshToken(req, res) {
        try {
            // Lấy Refresh Token từ cookie
            const refreshToken = req.cookies.refreshToken;
    
            // Nếu không có Refresh Token, trả về lỗi
            if (!refreshToken) {
                return res.status(401).json("Refresh Token is required");
            }
            // Tìm người dùng có token này
            const user = await User.findOne({ refreshTokens: refreshToken });
            if (!user) {
                return res.status(403).json("Invalid Refresh Token");
            }
            // Kiểm tra xem Refresh Token có hợp lệ không
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
                if (err) {
                    // Cấp lại Refresh Token bị lỗi (Hết hạn hoặc không hợp lệ)
                    return res.status(403).json("Invalid or expired Refresh Token");
                }
    
                // // Lấy thông tin người dùng từ decoded (decoded sẽ có thông tin sau khi giải mã token)
                // const user = await User.findById(decoded.id);
                // if (!user) {
                //     return res.status(404).json("User not found");
                // }
    
                // Tạo Access Token mới với thời gian hết hạn dài hơn
                const newAccessToken = jwt.sign(
                    { id: user.id, username: user.username },
                    process.env.JWT_ACCESS_SECRET,
                    { expiresIn: '300s' } // Access Token hết hạn sau 5 phút
                );
    
                // Tạo Refresh Token mới với thời gian hết hạn dài hơn
                const newRefreshToken = jwt.sign(
                    { id: user.id },
                    process.env.JWT_REFRESH_SECRET,
                    { expiresIn: '365d' } // Refresh Token hết hạn sau 365 ngày
                );

     // Cập nhật Refresh Token trong database
     user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
     user.refreshTokens.push(newRefreshToken);
     await user.save();

                // Cập nhật Refresh Token mới vào cookie
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,   // Đảm bảo chỉ có thể truy cập qua HTTP
                    secure: process.env.NODE_ENV === 'production', // Đặt thành true khi chạy trên HTTPS
                    path: "/",
                    sameSite: "strict", // Đảm bảo cookie không bị gửi cross-site
                });
    
                // Trả về Access Token mới
                return res.status(200).json({ newAccessToken });
            });
    
        } catch (error) {
            console.error(error); // In lỗi ra console để dễ dàng debug
            return res.status(500).json("Error in refreshing token: " + error.message);
        }
    }
    
    async logOutUser(req, res){
        try{
            const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json("No Refresh Token provided");
        }

           // Xóa Refresh Token khỏi database
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (!user) {
            return res.status(404).json("User not found");
        }

        user.refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
        await user.save();
        res.clearCookie("refreshToken"); // Xoa cookie tren client
        return res.status(200).json("Logged out");
        }catch(error){
            res.status(500).json(error);
        }
    }

}

module.exports = new authController();
