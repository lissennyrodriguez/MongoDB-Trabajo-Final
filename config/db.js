const dns = require("dns");

dns.setServers(["10.0.0.1"]);

require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tasksflow",
      maxPoolSize: 10,
    });

    console.log("MONGODB CONECTADO");
  } catch (error) {
    console.error("ERROR DE MONGODB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;