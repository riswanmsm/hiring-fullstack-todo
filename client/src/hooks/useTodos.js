import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch
  const fetchAllTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch TODOs from server');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllTodos();
  }, [fetchAllTodos]);

  // Create TODO
  const addTodo = async ({ title, description }) => {
    setError(null);
    try {
      const newTodo = await api.createTodo({ title, description });
      // Prepend newly created item to maintain createdAt desc order
      setTodos((prev) => [newTodo, ...prev]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to create TODO';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Optimistic Toggle Status (PATCH /api/todos/:id/done)
  const toggleTodoDone = async (id) => {
    setError(null);
    // 1. Snapshot prior state for rollback
    const previousTodos = [...todos];

    // 2. Immediately mutate state optimistically
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );

    // 3. Dispatch network request
    try {
      const updatedTodo = await api.toggleDoneStatus(id);
      // Re-sync with exact server response (updates updatedAt)
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      // 4. Rollback to prior snapshot on failure
      setTodos(previousTodos);
      setError(err.response?.data?.error || 'Failed to update status. Reverting changes.');
    }
  };

  // Optimistic Delete (DELETE /api/todos/:id)
  const removeTodo = async (id) => {
    setError(null);
    const previousTodos = [...todos];

    // Optimistically remove from state
    setTodos((prev) => prev.filter((todo) => todo._id !== id));

    try {
      await api.deleteTodo(id);
    } catch (err) {
      // Rollback on failure
      setTodos(previousTodos);
      setError(err.response?.data?.error || 'Failed to delete TODO. Reverting changes.');
    }
  };

  // Update TODO (PUT /api/todos/:id)
  const editTodo = async (id, { title, description }) => {
    setError(null);
    try {
      const updatedTodo = await api.updateTodo(id, { title, description });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to update TODO';
      setError(message);
      return { success: false, error: message };
    }
  };

  const clearError = () => setError(null);

  return {
    todos,
    isLoading,
    error,
    clearError,
    addTodo,
    toggleTodoDone,
    removeTodo,
    editTodo,
    refreshTodos: fetchAllTodos,
  };
};