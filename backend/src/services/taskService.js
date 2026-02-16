let tasks = require('../data/tasks');

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (id) => {
  return tasks.find(task => task.id === parseInt(id));
};

const createTask = (taskData) => {
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    ...taskData,
    completed: false
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (id, taskData) => {
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...taskData };
    return tasks[index];
  }
  return null;
};

const deleteTask = (id) => {
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    return deletedTask[0];
  }
  return null;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
