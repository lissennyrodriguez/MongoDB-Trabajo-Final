const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "La descripción no puede superar los 1000 caracteres"],
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    priority: {
      type: Number,
      required: [true, "La prioridad es obligatoria"],
      min: [1, "La prioridad mínima es 1"],
      max: [5, "La prioridad máxima es 5"],
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "El equipo es obligatorio"],
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);