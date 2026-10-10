const express = require("express")
const router = express.Router()
const salasController = require("../controllers/salasController")

router.get("/salas", salasController.listarSalas)

module.exports = router
