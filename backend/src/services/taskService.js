const Task = require('../models/Task');

const getAllTasks = async (query = {}) => {
  const { search, status } = query;
  let filter = {};

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  if (status) {
    filter.completed = status === 'completed';
  }

  return await Task.find(filter).sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  return await Task.findById(id);
};

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(
    id,
    { $set: taskData },
    { new: true, runValidators: true }
  );
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

