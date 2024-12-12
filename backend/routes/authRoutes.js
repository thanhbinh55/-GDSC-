const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/signup', authController.signUpUser);
router.post('/login', authController.logInUser);
router.post('/logout',authMiddleware.verifyToken ,authController.logOutUser);
router.post('/refresh', authController.requestRefreshToken);
module.exports = router;