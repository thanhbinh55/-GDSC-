const Post = require('../models/Post');
const { multipleMongooseToObject } = require('../util/mongoose'); // Utility để xử lý dữ liệu từ Mongoose

// Controller cho bài viết
class MePostController {
    // [GET] /me/stored.posts
    async storedMePosts(req, res) {     
        try{
            const posts = await Post.find();
            res.render('me/meStoredPosts', {
                posts: multipleMongooseToObject(posts),
                title: 'Danh sach bai viet cua toi',
            });
        }catch(err){
            res.status(500).json({message: err.message});
        }

        // try {
        //     const posts = await Post.find(); // Lấy danh sách bài viết từ MongoDB
        //     res.render('posts/posts', {
        //         posts: multipleMongooseToObject(posts), // Chuyển đổi dữ liệu MongoDB
        //         title: 'Danh sách bài viết page', // Truyền thêm biến tiêu đề cho giao diện
        //     });
        // } catch (err) {
        //     res.status(500).json({ message: err.message }); // Xử lý lỗi
        // }
    }
    // [GET] /posts/:slug
    async showDetail(req, res) {
        try {
            const post = await Post.findOne({ slug: req.params.slug });
            if (!post) {
                return res.render('posts/post', { title: 'Không tìm thấy bài viết', content: '', tags: [] });
            }
            res.render('posts/post', {
                title: post.title,
                content: post.content,
                image: post.image,
                tags: post.tags || [],
                slug: post.slug,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new MePostController();
