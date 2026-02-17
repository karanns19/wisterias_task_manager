const taskService = require("../services/taskService");

const getAllTasks = (req, res) => {
  const { search, status } = req.query;

  let tasks = taskService.getAllTasks();

  if (search) {
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (status) {
    if (!["completed", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'completed' or 'pending'",
      });
    }

    const isCompleted = status === "completed";
    tasks = tasks.filter((task) => task.completed === isCompleted);
  }

  res.json(tasks);
};

const getTaskById = (req, res, next) => {
  try {
    const task = taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      data: task
    });

  } catch (error) {
    next(error);
  }
};


const createTask = (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid title is required",
      });
    }

    const newTask = taskService.createTask({
      title: title.trim(),
      description: description || "",
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = (req, res) => {
  const updatedTask = taskService.updateTask(req.params.id, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

const deleteTask = (req, res) => {
  const deletedTask = taskService.deleteTask(req.params.id);
  if (deletedTask) {
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
