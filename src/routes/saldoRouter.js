const express = require("express")
const router = express.Router()
const saldoController = require("../controllers/saldoController")
const middlewareAutenticar = require("../middlewares/autenticar")

router.get("/saldo", middlewareAutenticar, saldoController.obterSaldo)

module.exports = router
