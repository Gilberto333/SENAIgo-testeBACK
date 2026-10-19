const db = require("../database/db")

async function salvarResgate(usuarioId, usuarioNome, produto) {
    const resultado = await db.query(
        `
        INSERT INTO resgates
        (
            usuario_id,
            usuario_nome,
            produto_id,
            produto_nome,
            produto_imagem,
            pontos
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
            id,
            usuario_id AS "usuarioId",
            usuario_nome AS "usuarioNome",
            produto_id AS "produtoId",
            produto_nome AS "produtoNome",
            produto_imagem AS "produtoImagem",
            pontos,
            criado_em AS "criadoEm"
        `,
        [
            usuarioId,
            usuarioNome,
            produto.id,
            produto.nome,
            produto.imagem,
            produto.pontos
        ]
    )

    return resultado.rows[0]
}

async function listarResgatesDoUsuario(usuarioId) {
    const resultado = await db.query(
        `
        SELECT
            id,
            usuario_id AS "usuarioId",
            usuario_nome AS "usuarioNome",
            produto_id AS "produtoId",
            produto_nome AS "produtoNome",
            produto_imagem AS "produtoImagem",
            pontos,
            criado_em AS "criadoEm"
        FROM resgates
        WHERE usuario_id = $1
        ORDER BY criado_em DESC
        `,
        [usuarioId]
    )

    return resultado.rows
}

module.exports = {
    salvarResgate,
    listarResgatesDoUsuario
}