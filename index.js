require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routes/routes");
const db = require("./db/conn");
const path = require('path')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Authorization-Token');
  next();
});

app.use(express.static(path.join(__dirname, 'client/build')));

if (process.env.NODE_ENV != "development") {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'), (err) => {
      if (err) return res.status(500).send(err);
    });
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

module.exports = { app, server };
