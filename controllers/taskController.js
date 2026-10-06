const Task = require("../models/Task");

// Obtener tareas con filtros, ordenamiento y paginación
const getTasks = async (req, res, next) => {
  try {
    const {
      status,
      team,
      sort = "-createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1 ||
      !Number.isInteger(limitNumber) ||
      limitNumber < 1
    ) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "page y limit deben ser números enteros mayores que 0",
      });
    }

    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (team) {
      filters.team = team;
    }

    const skip = (pageNumber - 1) * limitNumber;

    const [tasks, total] = await Promise.all([
      Task.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber)
        .populate("team", "name description")
        .populate("assignedTo", "name email role"),

      Task.countDocuments(filters),
    ]);

    res.json({
      data: tasks,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Obtener tarea por ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("team", "name description")
      .populate("assignedTo", "name email role");

    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Tarea no encontrada",
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Crear tarea
const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    const taskCreated = await Task.findById(task._id)
      .populate("team", "name description")
      .populate("assignedTo", "name email role");

    res.status(201).json(taskCreated);
  } catch (error) {
    next(error);
  }
};

// Actualizar tarea
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("team", "name description")
      .populate("assignedTo", "name email role");

    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Tarea no encontrada",
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Eliminar tarea
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Tarea no encontrada",
      });
    }

    res.json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};