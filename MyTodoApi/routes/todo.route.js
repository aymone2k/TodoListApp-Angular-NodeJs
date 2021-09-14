const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')
const auth = require('../middleware/auth');


//get todoList d'un author
router.get('/:idAuthor', todoController.todoList);
//create todo
router.post('/', todoController.addTodo)
//read todo
router.get('/byid/:id', todoController.getOneTodo)
//update todo
router.put('/:id', todoController.updateTodo)
//delete todo
router.delete('/:id', todoController.deleteTodo)

module.exports = router;   