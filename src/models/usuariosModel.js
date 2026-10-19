const db = require("../database/db")

async function cadastrarUsuario(dadosUsuario) {
    const sql = `
        INSERT INTO usuarios (cpf, nome, email, senha)
        VALUES ($1, $2, $3, $4)
        RETURNING id, cpf, nome, email;
    `

    const valores = [
        dadosUsuario.cpf,
        dadosUsuario.nome,
        dadosUsuario.email,
        dadosUsuario.senha
    ]

    const resultado = await db.query(sql, valores)

    return resultado.rows[0]
}

async function login(email, senha) {
    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = $1
        AND senha = $2;
    `

    const resultado = await db.query(sql, [email, senha])

    if (resultado.rows.length === 0) {
        return null
    }

    return resultado.rows[0]
}

async function buscarPorCPF(cpf) {
    const sql = `
        SELECT *
        FROM usuarios
        WHERE cpf = $1;
    `

    const resultado = await db.query(sql, [cpf])

    if (resultado.rows.length === 0) {
        return null
    }

    return resultado.rows[0]
}

module.exports = {
    cadastrarUsuario,
    login,
    buscarPorCPF
}