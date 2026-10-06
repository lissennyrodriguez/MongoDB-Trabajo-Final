const User = require("../models/User");

// Obtener todos los usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Crear usuario
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Actualizar usuario
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
