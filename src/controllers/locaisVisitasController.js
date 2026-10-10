const visitasModel = require("../models/locaisVisitasModel")
const salasModel = require("../models/salasModel")

function registrarVisitas(req, res) {
  const { nome, id } = req.usuario || {}
  const { salaId } = req.body

  if (!nome || !id || !salaId) {
    return res.status(400).json({ erro: "Dados incompletos para registrar a visita." })
  }

  // Nome e pontos vêm do cadastro de salas, não do cliente.
  const salaCadastrada = salasModel.buscarSalaPorId(Number(salaId))

  if (!salaCadastrada) {
    return res.status(404).json({ erro: "Sala não encontrada." })
  }

  const localDeVisita = visitasModel.salvarVisita(nome, id, salaCadastrada.salaId, salaCadastrada.sala, salaCadastrada.pontos)

  return res.status(201).json({ sucesso: "Visita registrada com sucesso!", localDeVisita })
}
























function listarVisitas (req, res){
const todasVisitas = visitasModel.listarVisitas()
if(todasVisitas === null){
    return res.json({erro: "nao tem"})
}
return res.json(todasVisitas)
}


module.exports = { registrarVisitas, listarVisitas }