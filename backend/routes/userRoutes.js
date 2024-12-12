const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/getAllUser', authMiddleware.verifyToken, userController.getAllUser);
module.exports = router;