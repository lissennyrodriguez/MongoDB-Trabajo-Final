const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // 400 - Error de validación
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Error de validación",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  // 400 - ID no válido
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "ID no válido",
    });
  }

  // 409 - Registro duplicado
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: "Ya existe un registro con ese valor único",
      field: Object.keys(err.keyPattern || {}),
    });
  }

  // 500 - Error inesperado
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Error interno del servidor",
  });
};

module.exports = errorMiddleware;
