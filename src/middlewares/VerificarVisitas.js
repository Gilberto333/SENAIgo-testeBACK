const visitasModel = require("../models/locaisVisitasModel")

async function verificarVisita(req, res, next) {

    const visitas = await visitasModel.listarVisitas()

    const { id } = req.usuario
    const { salaId } = req.body

    const registrado = visitas.find(
        v => v.id === id && v.salaId === Number(salaId)
    )

    if (registrado) {
        return res.status(409).json({
            erro: "O local já foi visitado!"
        })
    }

    next()
}

module.exports = verificarVisita