const express = require("express");
const router = express.Router();
const controller = require("../controllers/libroController");

router.get("/", controller.listarLibros);

module.exports = router;