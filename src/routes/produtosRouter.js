const express = require("express")
const router = express.Router()
const produtosController = require("../controllers/produtosController")
const middlewareAutenticar = require("../middlewares/autenticar")
const middlewareAutorizarAdmin = require("../middlewares/autorizarAdmin")
const validarSchema = require("../middlewares/validarSchema")
const schema = require("../middlewares/schema")

router.get("/produtos", produtosController.listarProdutos)
router.get("/produtos/:id", produtosController.buscarProduto)

router.post("/cadastrarProduto", middlewareAutenticar, middlewareAutorizarAdmin, validarSchema(schema.produto), produtosController.cadastrarProduto)
router.put("/atualizarProduto/:id", middlewareAutenticar, middlewareAutorizarAdmin, validarSchema(schema.produto), produtosController.atualizarProduto)
router.delete("/removerProduto/:id", middlewareAutenticar, middlewareAutorizarAdmin, produtosController.removerProduto)

module.exports = router
