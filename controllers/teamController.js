const Team = require("../models/Team");

// Obtener todos los equipos
const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate("members", "name email role");

    res.json(teams);
  } catch (error) {
    next(error);
  }
};

// Obtener equipo por ID
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "members",
      "name email role"
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Equipo no encontrado",
      });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

// Crear equipo
const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);

    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

// Actualizar equipo
const updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("members", "name email role");

    if (!team) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Equipo no encontrado",
      });
    }

    res.json(team);
  } catch (error) {
    next(error);
  }
};

// Eliminar equipo
const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Equipo no encontrado",
      });
    }

    res.json({
      message: "Equipo eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
