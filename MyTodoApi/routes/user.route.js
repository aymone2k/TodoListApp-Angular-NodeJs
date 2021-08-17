const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
//SignIn
router.get('/signin', userController.signIn)
//SignUp
router.post('/signup', userController.signUp)
//UpdateUser
router.put('/updateuser/:id', userController.updateUser)

module.exports = router;