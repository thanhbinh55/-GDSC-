const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../util/mongoose'); // Utility để xử lý dữ liệu từ Mongoose

// Controller cho bài viết
class PostController {
    // [GET] /posts
    async showList(req, res) {
        try {
            const posts = await Post.find(); // Lấy danh sách bài viết từ MongoDB
            res.render('posts/posts', {
                posts: multipleMongooseToObject(posts), // Chuyển đổi dữ liệu MongoDB
                title: 'Danh sách bài viết', // Truyền thêm biến tiêu đề cho giao diện
            });
        } catch (err) {
            res.status(500).json({ message: err.message }); // Xử lý lỗi
        }
    }
    // [GET] /posts/:id
    async showDetail(req, res) {
        try {
            const post = await Post.findById(req.params._id);
            if (!post) {
                return res.render('posts/post', { title: 'Không tìm thấy bài viết', content: '', tags: [] });
            }
            // res.render('posts/post', {
            //     title: 'Bài viết mẫu',
            //     content: 'Đây là nội dung của bài viết mẫu.',
            //     tags: ['tag1', 'tag2', 'tag3'],
            // });
            res.render('posts/post', {
                title: post.title,
                content: post.content,
                image: post.image,
                tags: post.tags || [],
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
     // [POST] /posts - Tạo bài viết mới
     async createPost(req, res) {
        try {
            const post = new Post(req.body); // Nhận dữ liệu từ request body
            const savedPost = await post.save(); // Lưu vào cơ sở dữ liệu
            res.status(201).json(savedPost); // Trả về bài viết vừa tạo
        } catch (err) {
            res.status(400).json({ message: err.message }); // Xử lý lỗi
        }
    }
}

module.exports = new PostController();
