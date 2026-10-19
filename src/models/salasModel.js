const db = require("../database/db")

async function listarSalas() {
    const resultado = await db.query(`
        SELECT *
        FROM salas
        WHERE ativa = true
        ORDER BY sala_id
    `)

    return resultado.rows
}

async function listarTodasSalas() {
    const resultado = await db.query(`
        SELECT *
        FROM salas
        ORDER BY sala_id
    `)

    return resultado.rows
}

async function buscarSalaPorId(salaId) {
    const resultado = await db.query(
        `SELECT * FROM salas WHERE sala_id = $1`,
        [salaId]
    )

    return resultado.rows[0] || null
}

async function cadastrarSala(dadosSala) {
    const resultado = await db.query(
        `
        INSERT INTO salas (sala, pontos, icone, descricao)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            dadosSala.sala,
            dadosSala.pontos,
            dadosSala.icone || "map-pin",
            dadosSala.descricao || ""
        ]
    )

    return resultado.rows[0]
}

async function atualizarSala(salaId, dadosSala) {
    const resultado = await db.query(
        `
        UPDATE salas
        SET
            sala = $1,
            pontos = $2,
            icone = $3,
            descricao = $4,
            ativa = $5
        WHERE sala_id = $6
        RETURNING *
        `,
        [
            dadosSala.sala,
            dadosSala.pontos,
            dadosSala.icone || "map-pin",
            dadosSala.descricao || "",
            dadosSala.ativa,
            salaId
        ]
    )

    return resultado.rows[0] || null
}

async function removerSala(salaId) {
    const resultado = await db.query(
        `
        DELETE FROM salas
        WHERE sala_id = $1
        RETURNING *
        `,
        [salaId]
    )

    return resultado.rows[0] || null
}

module.exports = {
    listarSalas,
    listarTodasSalas,
    buscarSalaPorId,
    cadastrarSala,
    atualizarSala,
    removerSala
}