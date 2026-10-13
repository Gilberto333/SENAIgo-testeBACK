const listaSalas = [
  { salaId: 1, sala: "Robótica", pontos: 5, icone: "bot", descricao: "Laboratório de Automação e Braços Robóticos.", ativa: true },
  { salaId: 2, sala: "Refrigeração", pontos: 10, icone: "snowflake", descricao: "Oficina Prática de Sistemas Térmicos e Climatização.", ativa: true }
]
let id = listaSalas.length + 1


function listarSalas() {
  return listaSalas.filter(s => s.ativa)
}

function listarTodasSalas() {
  return listaSalas
}

function buscarSalaPorId(salaId) {
  return listaSalas.find(s => s.salaId === salaId) || null
}

function cadastrarSala(dadosSala) {
  const sala = {
    salaId: id++,
    sala: dadosSala.sala,
    pontos: dadosSala.pontos,
    icone: dadosSala.icone || "map-pin",
    descricao: dadosSala.descricao || "",
    ativa: true
  }
  listaSalas.push(sala)

  return sala
}

function atualizarSala(salaId, dadosSala) {
  const sala = buscarSalaPorId(salaId)

  if (!sala) {
    return null
  }

  sala.sala = dadosSala.sala
  sala.pontos = dadosSala.pontos
  sala.icone = dadosSala.icone || "map-pin"
  sala.descricao = dadosSala.descricao || ""
  sala.ativa = dadosSala.ativa === undefined ? sala.ativa : dadosSala.ativa

  return sala
}

function removerSala(salaId) {
  const posicao = listaSalas.findIndex(s => s.salaId === salaId)

  if (posicao === -1) {
    return null
  }

  return listaSalas.splice(posicao, 1)[0]
}

module.exports = { listarSalas, listarTodasSalas, buscarSalaPorId, cadastrarSala, atualizarSala, removerSala }