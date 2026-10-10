const visitasModel = require("../models/locaisVisitasModel")

function verificarVisita(req, res, next){
    const verificador = visitasModel.listarVisitas()
const {nome, id} = req.usuario
const {salaId, sala, pontos} = req.body

const registrado = verificador.find(v => v.id === id && v.salaId === Number(salaId))
if(registrado){
    return res.status(409).json({erro: "O local já foi visitado!"})
}

next()

}
module.exports = verificarVisita
