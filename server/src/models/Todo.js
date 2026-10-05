const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Manages createdAt and updatedAt automatically
  }
);

// Index to optimize queries sorted by newest first
todoSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Todo', todoSchema);