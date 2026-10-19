const usuariosModel = require("../models/usuariosModel")

async function cadastrarUsuario(req, res) {
    const dadosUsuario = req.body

    const usuario = await usuariosModel.cadastrarUsuario(dadosUsuario)

    const { senha: _senha, ...usuarioSemSenha } = usuario

    return res.status(201).json({
        sucesso: "Usuário cadastrado com sucesso!",
        usuario: usuarioSemSenha
    })
}

module.exports = { cadastrarUsuario }