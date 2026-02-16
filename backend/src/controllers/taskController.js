const taskService = require('../services/taskService');

const getAllTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const task = taskService.getTaskById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const createTask = (req, res) => {
  const newTask = taskService.createTask(req.body);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(req.params.id, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = (req, res) => {
  const deletedTask = taskService.deleteTask(req.params.id);
  if (deletedTask) {
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
