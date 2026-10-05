const todoService = require('../services/todoService');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.getTodos = asyncHandler(async (req, res) => {
  const todos = await todoService.getAllTodos();
  res.status(200).json(todos);
});

exports.createTodo = asyncHandler(async (req, res) => {
  const newTodo = await todoService.createTodo(req.body);
  res.status(201).json(newTodo);
});

exports.updateTodo = asyncHandler(async (req, res) => {
  const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
  res.status(200).json(updatedTodo);
});

exports.toggleDone = asyncHandler(async (req, res) => {
  const toggledTodo = await todoService.toggleDoneStatus(req.params.id);
  res.status(200).json(toggledTodo);
});

exports.deleteTodo = asyncHandler(async (req, res) => {
  const result = await todoService.deleteTodo(req.params.id);
  res.status(200).json(result);
});