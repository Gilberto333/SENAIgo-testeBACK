const usuariosModel = require("../models/usuariosModel");

function verificarUsuarioExistente(req, res, next) {
    const { cpf } = req.body;

    const usuario = usuariosModel.buscarPorCPF(cpf);

    if (usuario) {
        return res.status(409).json({
            erro: "Já existe um usuário cadastrado com este CPF."
        });
    }

    next();
}

module.exports = verificarUsuarioExistente;