const historicoVisitas = []

function salvarVisita(usuario, id, salaId, sala, pontos) {
  const localVisitado = {
    id: id,
    nome: usuario,
    salaId: salaId,
    sala: sala,
    criadoEm: new Date(),
    pontuacao: pontos
  }

  historicoVisitas.push(localVisitado)
  return localVisitado
}


















function listarVisitas (){
    return historicoVisitas
}

module.exports = { salvarVisita, listarVisitas }