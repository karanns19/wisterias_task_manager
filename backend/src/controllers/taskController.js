const taskService = require("../services/taskService");

const getAllTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    if (status && !["completed", "pending"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'completed' or 'pending'",
      });
    }

    const tasks = await taskService.getAllTasks({ search, status });

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

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


const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid title is required",
      });
    }

    const newTask = await taskService.createTask({
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

const updateTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    if (updatedTask) {
      res.json({
        success: true,
        data: updatedTask
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await taskService.deleteTask(req.params.id);
    if (deletedTask) {
      res.json({
        success: true,
        message: "Task deleted successfully"
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};

