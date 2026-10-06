const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del equipo es obligatorio"],
      unique: true,
      trim: true,
      minlength: [2, "El nombre del equipo debe tener al menos 2 caracteres"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede superar los 500 caracteres"],
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Team", teamSchema);