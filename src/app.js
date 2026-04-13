const express = require("express");
const cors = require("cors");

const libroRoutes = require("./interfaces/routes/libroRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Biblioteca funcionando 🚀");
});

app.use("/api/libros", libroRoutes);

module.exports = app;