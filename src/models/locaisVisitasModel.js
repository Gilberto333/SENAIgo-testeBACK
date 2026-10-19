const db = require("../database/db")

async function salvarVisita(usuario, id, salaId, sala, pontos) {

    const resultado = await db.query(
        `
        INSERT INTO visitas (usuario_id, sala_id, pontuacao)
        VALUES ($1, $2, $3)
        RETURNING criado_em
        `,
        [id, salaId, pontos]
    )

    return {
        id,
        nome: usuario,
        salaId,
        sala,
        pontuacao: pontos,
        criadoEm: resultado.rows[0].criado_em
    }
}

async function listarVisitas() {

    const resultado = await db.query(`
        SELECT
            v.usuario_id AS id,
            u.nome,
            v.sala_id AS "salaId",
            s.sala,
            v.pontuacao,
            v.criado_em AS "criadoEm"
        FROM visitas v
        JOIN usuarios u
            ON u.id = v.usuario_id
        JOIN salas s
            ON s.sala_id = v.sala_id
        ORDER BY v.criado_em DESC
    `)

    return resultado.rows
}


async function verificarVisita(usuarioId, salaId) {

    const resultado = await db.query(
        `
        SELECT 1
        FROM visitas
        WHERE usuario_id = $1
        AND sala_id = $2
        LIMIT 1
        `,
        [usuarioId, salaId]
    )

    return resultado.rows.length > 0
}
module.exports = {
    salvarVisita,
    listarVisitas,
    verificarVisita
}