const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateCreateTodo, validateUpdateTodo } = require('../validators/todoValidator');

router.get('/', todoController.getTodos);
router.post('/', validateCreateTodo, todoController.createTodo);
router.put('/:id', validateUpdateTodo, todoController.updateTodo);
router.patch('/:id/done', todoController.toggleDone);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;