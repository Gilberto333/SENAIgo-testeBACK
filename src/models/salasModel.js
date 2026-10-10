const listaSalas = [
  { salaId: 1, sala: "Robótica", pontos: 5, icone: "bot", descricao: "Laboratório de Automação e Braços Robóticos." },
  { salaId: 2, sala: "Refrigeração", pontos: 10, icone: "snowflake", descricao: "Oficina Prática de Sistemas Térmicos e Climatização." }
]

function listarSalas() {
  return listaSalas
}

function buscarSalaPorId(salaId) {
  return listaSalas.find(s => s.salaId === salaId) || null
}

module.exports = { listarSalas, buscarSalaPorId }
