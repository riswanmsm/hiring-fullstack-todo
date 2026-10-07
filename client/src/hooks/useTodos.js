import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/todoApi';

const getErrorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
    return 'Connection timed out. Please check your network connection and try again.';
  }
  if (err.response?.data?.error) {
    return err.response.data.error;
  }
  if (err.request && !err.response) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }
  return fallback;
};

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  // Initial fetch
  const fetchAllTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to load tasks. Please try again.'));
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
    setIsMutating(true);
    try {
      const newTodo = await api.createTodo({ title, description });
      // Prepend newly created item to maintain createdAt desc order
      setTodos((prev) => [newTodo, ...prev]);
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to create task. Please try again.');
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsMutating(false);
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
    setIsMutating(true);
    try {
      const updatedTodo = await api.toggleDoneStatus(id);
      // Re-sync with exact server response (updates updatedAt)
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      // 4. Rollback to prior snapshot on failure
      setTodos(previousTodos);
      setError(getErrorMessage(err, 'Unable to update task. Reverting changes.'));
    } finally {
      setIsMutating(false);
    }
  };

  // Optimistic Delete (DELETE /api/todos/:id)
  const removeTodo = async (id) => {
    setError(null);
    const previousTodos = [...todos];

    // Optimistically remove from state
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
    setIsMutating(true);

    try {
      await api.deleteTodo(id);
    } catch (err) {
      // Rollback on failure
      setTodos(previousTodos);
      setError(getErrorMessage(err, 'Unable to delete task. Reverting changes.'));
    } finally {
      setIsMutating(false);
    }
  };

  // Update TODO (PUT /api/todos/:id)
  const editTodo = async (id, { title, description }) => {
    setError(null);
    setIsMutating(true);
    try {
      const updatedTodo = await api.updateTodo(id, { title, description });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to save changes. Please try again.');
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsMutating(false);
    }
  };

  const clearError = () => setError(null);

  return {
    todos,
    isLoading,
    isMutating,
    error,
    clearError,
    addTodo,
    toggleTodoDone,
    removeTodo,
    editTodo,
    refreshTodos: fetchAllTodos,
  };
};