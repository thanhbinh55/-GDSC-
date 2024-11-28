const express = require('express');
const router = express.Router();// la gi


const postController = require('../controllers/PostController');

// List bai viet
router.get('/',postController.showList);
router.get('/:_id',postController.showDetail);
router.post('/',postController.createPost);

// Route khác như Update, Delete sẽ được thêm vào sau
module.exports = router;