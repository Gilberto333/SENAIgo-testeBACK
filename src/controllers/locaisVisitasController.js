const visitasModel = require("../models/locaisVisitasModel")
const salasModel = require("../models/salasModel")

async function registrarVisitas(req, res) {
    try {
        const { nome, id } = req.usuario || {}
        const { salaId } = req.body

        if (!nome || !id || !salaId) {
            return res.status(400).json({
                erro: "Dados incompletos para registrar a visita."
            })
        }

        const salaCadastrada = await salasModel.buscarSalaPorId(Number(salaId))

        if (!salaCadastrada || !salaCadastrada.ativa) {
            return res.status(404).json({
                erro: "Sala não encontrada ou desativada."
            })
        }

        const localDeVisita = await visitasModel.salvarVisita(
            nome,
            id,
            salaCadastrada.sala_id,
            salaCadastrada.sala,
            salaCadastrada.pontos
        )

        return res.status(201).json({
            sucesso: "Visita registrada com sucesso!",
            localDeVisita
        })

    } catch (erro) {

        if (erro.code === "23505") {
            return res.status(409).json({
                erro: "Você já registrou visita nesta sala."
            })
        }

        return res.status(500).json({
            erro: "Erro ao registrar visita."
        })
    }
}

async function listarVisitas(req, res) {
    const todasVisitas = await visitasModel.listarVisitas()

    if (todasVisitas.length === 0) {
        return res.json({
            erro: "Nenhuma visita encontrada."
        })
    }

    return res.json(todasVisitas)
}

module.exports = {
    registrarVisitas,
    listarVisitas
}