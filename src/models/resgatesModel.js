const historicoResgates = []
let id = 1

// Guarda uma cópia do nome e do custo do produto: o histórico não muda se o produto for editado ou removido.
function salvarResgate(usuarioId, usuarioNome, produto) {
  const resgate = {
    id: id++,
    usuarioId: usuarioId,
    usuarioNome: usuarioNome,
    produtoId: produto.id,
    produtoNome: produto.nome,
    produtoImagem: produto.imagem,
    pontos: produto.pontos,
    criadoEm: new Date()
  }

  historicoResgates.push(resgate)

  return resgate
}

function listarResgatesDoUsuario(usuarioId) {
  return historicoResgates.filter(r => r.usuarioId === usuarioId)
}

module.exports = { salvarResgate, listarResgatesDoUsuario }
