const produtosModel = require("../models/produtosModel")
const resgatesModel = require("../models/resgatesModel")
const saldoModel = require("../models/saldoModel")

async function resgatarProduto(req, res) {
  const { id, nome } = req.usuario
  const produto = await produtosModel.buscarProdutoPorId(req.body.produtoId)

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado." })
  }

  if (produto.estoque <= 0) {
    return res.status(409).json({ erro: "Este produto está esgotado." })
  }

  const { saldo } = await saldoModel.calcularSaldo(id)

  if (saldo < produto.pontos) {
    return res.status(400).json({ erro: `Pontos insuficientes. Você tem ${saldo} e o produto custa ${produto.pontos}.` })
  }

  await produtosModel.baixarEstoque(produto.id)
  const resgate = await resgatesModel.salvarResgate(id, nome, produto)
  const novoSaldo = await saldoModel.calcularSaldo(id)

  return res.status(201).json({ sucesso: "Produto resgatado com sucesso!", resgate, ...novoSaldo })
}

async function listarResgates(req, res) {
  const resgates = await resgatesModel.listarResgatesDoUsuario(req.usuario.id)
  return res.json(resgates)
}

module.exports = { resgatarProduto, listarResgates }
