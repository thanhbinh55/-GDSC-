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
                title: 'Danh sách bài viết page', // Truyền thêm biến tiêu đề cho giao diện
            });
        } catch (err) {
            res.status(500).json({ message: err.message }); // Xử lý lỗi
        }
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
     // [GET] /posts/create - Tạo bài viết mới
     async showCreateForm(req, res) {
        try {
            res.render('posts/postcreate', { title: 'Create New Post' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createPost(req, res) {
        try {
            const { title, content, image, tags, slug } = req.body;
    
            const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    
            const post = new Post({
                title,
                content,
                image,
                tags: tagsArray,
                slug,
            });
    
            const savedPost = await post.save();
            res.redirect(`/posts/showpost/${savedPost.slug}`); // Điều hướng đến chi tiết bài viết
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
    
}

module.exports = new PostController();
