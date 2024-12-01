const express = require('express');
const router = express.Router();// la gi


const postController = require('../controllers/PostController');

// List bai viet
router.get('/showpost/:slug', postController.showDetail);

// Hiển thị danh sách bài viết
router.get('/', postController.showList);

// Hiển thị form tạo bài viết
router.get('/action/create', postController.showCreateForm);

// Xử lý việc tạo bài viết
router.post('/action/create', postController.createPost);  

// Route khác như Update, Delete sẽ được thêm vào sau
module.exports = router;