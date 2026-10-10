function rotaNaoEncontrada(req, res) {
  return res.status(404).json({ erro: `Rota ${req.method} ${req.originalUrl} não encontrada.` })
}

function tratarErros(erro, req, res, next) {
  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido no corpo da requisição." })
  }

  console.error(erro)
  return res.status(500).json({ erro: "Erro interno no servidor." })
}

module.exports = { rotaNaoEncontrada, tratarErros }
