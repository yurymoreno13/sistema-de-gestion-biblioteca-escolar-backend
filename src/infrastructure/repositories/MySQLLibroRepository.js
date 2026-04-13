const db = require("../db/mysql");

class MySQLLibroRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      console.log("📚 Ejecutando SELECT en libros...");

      db.query("SELECT * FROM libros", (err, results) => {
        if (err) {
          console.error("❌ Error SQL:", err);
          return reject(err);
        }

        console.log("✅ Resultados SQL:", results);
        return resolve(results);
      });
    });
  }
}

module.exports = MySQLLibroRepository;