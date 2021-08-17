const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')



//get todoList
router.get('/', todoController.todoList);
//get categoryTodoList
router.get('/:author', todoController.todoListAuthor)
//create todo
router.post('/', todoController.addTodo)
//read todo
router.get('/:id', todoController.getOneTodo)
//update todo
router.put('/:id', todoController.updateTodo)
//delete todo
router.delete('/id', todoController.deleteTodo)

module.exports = router; 