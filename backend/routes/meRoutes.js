const express = require('express');
const router = express.Router();// la gi


const meController = require('../controllers/MePostController');

// List bai viet cua toi
router.get('/stored/posts', meController.storedMePosts);


module.exports = router;