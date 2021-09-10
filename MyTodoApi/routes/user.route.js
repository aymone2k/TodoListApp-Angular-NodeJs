const express = require('express');
const router = express.Router();
const multerConfig = require('../middleware/multer.config');
const userController = require('../controllers/user.controller');
//SignIn
router.post('/signin', userController.signIn)
//SignUp
router.post('/signup', multerConfig, userController.signUp)
//UpdateUser
router.put('/updateuser/:id', multerConfig, userController.updateUser)

module.exports = router; 