import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, completed

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const data = await api.getTasks(params);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks. Please check if the backend is running.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      setIsSubmitting(true);
      const newTask = await api.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create task';
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const updatedTask = await api.updateTask(task.id, { 
        completed: !task.completed 
      });
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    } catch (err) {
      console.error('Toggle error:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    isSubmitting,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addTask,
    toggleTaskStatus,
    deleteTask,
    refresh: fetchTasks,
    stats
  };
};
