const MySQLLibroRepository = require("../../infrastructure/repositories/MySQLLibroRepository");

const repo = new MySQLLibroRepository();

exports.listarLibros = async (req, res) => {
  try {
    console.log("➡️ Entró a listarLibros");

    const data = await repo.findAll();

    console.log("✅ Datos enviados:", data);

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error en listarLibros:", error);
    return res.status(500).json({
      error: "Error al obtener libros",
      detalle: error.message
    });
  }
};