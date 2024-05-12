require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL;

mongoose.connect(MONGO_CONNECT_URL, {
  dbName: "freework",
});

let db = mongoose.connection;

db.on("error", () => {
  console.log("Falha ao conectar o banco de dados.");
});

console.log("Conexão com o banco de dados estabelecida com sucesso!");

module.exports = db;
