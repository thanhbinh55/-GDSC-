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

// Hiển thị form Chỉnh sửa bài viết
router.get('/:_id/edit', postController.showEditForm);
// Xử lý việc chỉnh sửa bài viết
router.put('/:_id', postController.updateMePost);
// Xử lý việc xóa sửa bài viết
router.delete('/:_id', postController.deleteMePost);
// Route khác như Update, Delete sẽ được thêm vào sau
module.exports = router;