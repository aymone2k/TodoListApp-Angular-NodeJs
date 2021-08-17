const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
//SignIn
router.post('/signIn', userController.signIn)
//SignUp
router.post('/signUp', userController.signUp)
//UpdateUser

module.exports = router;