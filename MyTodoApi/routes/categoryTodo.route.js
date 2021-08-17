const express = require('express');
const router = express.Router();
const categoryTodoController = require('../controllers/categoryTodo.controller')

//get categoryTodoList
router.get('/', categoryTodoController.categoryTodoList);
//get categoryTodo
router.get('/:id', categoryTodoController.getCategoryTodo);
//create categoryTodo
router.post('/', categoryTodoController.addCategoryTodo);
//update categoryTodo
router.put('/:id', categoryTodoController.updateCategoryTodo);


module.exports = router;