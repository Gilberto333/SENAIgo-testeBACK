const salasModel = require("../models/salasModel")

async function listarSalas(req, res) {
  const salas = await salasModel.listarSalas()
  return res.json(salas)
}

module.exports = { listarSalas }
