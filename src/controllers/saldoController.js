const saldoModel = require("../models/saldoModel")

async function obterSaldo(req, res) {
  const saldo = await saldoModel.calcularSaldo(req.usuario.id)
  return res.json(saldo)
}

module.exports = { obterSaldo }
