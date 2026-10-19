const db = require("../database/db")

async function listarProdutos() {
    const resultado = await db.query(`
        SELECT *
        FROM produtos
        ORDER BY id
    `)

    return resultado.rows
}

async function buscarProdutoPorId(produtoId) {
    const resultado = await db.query(
        `SELECT * FROM produtos WHERE id = $1`,
        [produtoId]
    )

    return resultado.rows[0] || null
}

async function cadastrarProduto(dadosProduto) {
    const resultado = await db.query(
        `
        INSERT INTO produtos (nome, imagem, pontos, estoque)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            dadosProduto.nome,
            dadosProduto.imagem || "🎁",
            dadosProduto.pontos,
            dadosProduto.estoque
        ]
    )

    return resultado.rows[0]
}

async function atualizarProduto(produtoId, dadosProduto) {
    const resultado = await db.query(
        `
        UPDATE produtos
        SET
            nome = $1,
            imagem = $2,
            pontos = $3,
            estoque = $4
        WHERE id = $5
        RETURNING *
        `,
        [
            dadosProduto.nome,
            dadosProduto.imagem || "🎁",
            dadosProduto.pontos,
            dadosProduto.estoque,
            produtoId
        ]
    )

    return resultado.rows[0] || null
}

async function removerProduto(produtoId) {
    const resultado = await db.query(
        `
        DELETE FROM produtos
        WHERE id = $1
        RETURNING *
        `,
        [produtoId]
    )

    return resultado.rows[0] || null
}

async function baixarEstoque(produtoId) {
    const resultado = await db.query(
        `
        UPDATE produtos
        SET estoque = estoque - 1
        WHERE id = $1
        AND estoque > 0
        RETURNING *
        `,
        [produtoId]
    )

    return resultado.rows[0] || null
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    cadastrarProduto,
    atualizarProduto,
    removerProduto,
    baixarEstoque
}