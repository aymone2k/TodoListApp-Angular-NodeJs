const express = require('express');
const router = express.Router();
const categoryTodoController = require('../controllers/categoryTodo.controller')

//get categoryTodoList
router.get('/', categoryTodoController.categoryTodoList)
//create categoryTodo
router.post('/', categoryTodoController.addCategoryTodo)
//delete categoryTodo
router.delete('/:id', categoryTodoController.deleteCategoryTodo)

module.exports = router;