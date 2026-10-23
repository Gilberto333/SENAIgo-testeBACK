const express = require("express")
const router = express.Router()
const resgatesController = require("../controllers/resgatesController")
const middlewareAutenticar = require("../middlewares/autenticar")
const validarSchema = require("../middlewares/validarSchema")
const schema = require("../middlewares/schema")

router.post("/resgatarProduto", middlewareAutenticar, validarSchema(schema.resgate), resgatesController.resgatarProduto)
router.get("/resgates", middlewareAutenticar, resgatesController.listarResgates)


router.get("/admin/resgates/cpf/:cpf", middlewareAutenticar, resgatesController.consultarResgatesPorCpf)

module.exports = router