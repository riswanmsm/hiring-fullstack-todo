const validateCreateTodo = (req, res, next) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }

  req.body.title = title.trim();
  if (description) req.body.description = description.trim();

  next();
};

const validateUpdateTodo = (req, res, next) => {
  const { title, description } = req.body;

  if (title === undefined && description === undefined) {
    return res.status(400).json({ error: 'At least one field (title or description) must be provided' });
  }

  if (title !== undefined && (!title || typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ error: 'Title cannot be an empty string' });
  }

  if (title) req.body.title = title.trim();
  if (description !== undefined) req.body.description = description.trim();

  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
};