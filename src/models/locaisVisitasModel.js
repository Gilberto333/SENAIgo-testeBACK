const db = require("../database/db")

async function salvarVisita(usuario, id, salaId, sala, pontos) {
    const resultado = await db.query(
        `
        INSERT INTO visitas (usuario_id, sala_id, pontuacao)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [id, salaId, pontos]
    )

    return {
        id: resultado.rows[0].id,
        usuarioId: id,
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
            v.id,
            v.usuario_id,
            u.nome,
            v.sala_id,
            s.sala,
            v.pontuacao,
            v.criado_em
        FROM visitas v
        JOIN usuarios u
            ON u.id = v.usuario_id
        JOIN salas s
            ON s.sala_id = v.sala_id
        ORDER BY v.criado_em DESC
    `)

    return resultado.rows
}

module.exports = {
    salvarVisita,
    listarVisitas
}