const mongoose = require('mongoose');
const Todo = require('../models/Todo');

class TodoService {
  async getAllTodos() {
    return await Todo.find().sort({ createdAt: -1 }).lean();
  }

  async createTodo(data) {
    const { title, description } = data;
    return await Todo.create({ title, description });
  }

  async updateTodo(id, updates) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid ID format');
      error.statusCode = 404;
      throw error;
    }

    const updated = await Todo.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      const error = new Error('TODO item not found');
      error.statusCode = 404;
      throw error;
    }

    return updated;
  }

  async toggleDoneStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid ID format');
      error.statusCode = 404;
      throw error;
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      const error = new Error('TODO item not found');
      error.statusCode = 404;
      throw error;
    }

    todo.done = !todo.done;
    return await todo.save();
  }

  async deleteTodo(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('Invalid ID format');
      error.statusCode = 404;
      throw error;
    }

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      const error = new Error('TODO item not found');
      error.statusCode = 404;
      throw error;
    }

    return { id, message: 'TODO deleted successfully' };
  }
}

module.exports = new TodoService();