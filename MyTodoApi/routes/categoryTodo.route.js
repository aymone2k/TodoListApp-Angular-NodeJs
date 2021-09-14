const express = require('express');
const router = express.Router();
const categoryTodoController = require('../controllers/categoryTodo.controller')
const auth = require('../middleware/auth');
//get categoryTodoList d'un author
router.get('/:idAuthor', categoryTodoController.categoryTodoList);
//get categoryTodo
router.get('/:id ', categoryTodoController.getCategoryTodo);
//create categoryTodo
router.post('/', categoryTodoController.addCategoryTodo);
//update categoryTodo
router.put('/:id', categoryTodoController.updateCategoryTodo);


module.exports = router;  