function autorizarAdmin(req, res, next) {
  if (!req.usuario || !req.usuario.admin) {
    return res.status(403).json({ erro: "Acesso restrito a administradores." })
  }

  next()
}

module.exports = autorizarAdmin
