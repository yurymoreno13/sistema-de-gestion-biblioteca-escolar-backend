const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// 🔌 CONEXIÓN MYSQL
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "biblioteca"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error MySQL:", err);
  } else {
    console.log("🔥 Conectado a MySQL");
  }
});

// =======================
// 🏠 RUTA PRINCIPAL
// =======================
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// =======================
// 🔐 LOGIN
// =======================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ success: false, message: "Error login" });
    }

    if (result.length > 0) {
      res.json({ success: true, message: "Login exitoso" });
    } else {
      res.json({ success: false, message: "Credenciales incorrectas" });
    }
  });
});

// =======================
// 📝 REGISTRO (SIN DUPLICADOS)
// =======================
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  // verificar si existe
  db.query("SELECT * FROM usuarios WHERE email=?", [email], (err, result) => {
    if (err) {
      return res.json({ success: false, message: "Error registro" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Usuario ya existe" });
    }

    // crear usuario
    db.query(
      "INSERT INTO usuarios (email, password) VALUES (?, ?)",
      [email, password],
      (err) => {
        if (err) {
          return res.json({ success: false, message: "Error al crear usuario" });
        }

        res.json({ success: true, message: "Usuario creado" });
      }
    );
  });
});

// =======================
// 📚 CREAR LIBRO
// =======================
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  const sql = "INSERT INTO libros (title, author) VALUES (?, ?)";

  db.query(sql, [title, author], (err) => {
    if (err) {
      return res.json({ success: false, message: "Error libro" });
    }

    res.json({ success: true, message: "Libro creado" });
  });
});

// =======================
// 📋 LISTAR LIBROS
// =======================
app.get("/books", (req, res) => {
  db.query("SELECT * FROM libros", (err, result) => {
    if (err) {
      return res.json({ success: false, data: [] });
    }

    res.json({ success: true, data: result });
  });
});

// =======================
// 🚀 SERVIDOR
// =======================
app.listen(3001, () => {
  console.log("🚀 Servidor corriendo en puerto 3001");
});