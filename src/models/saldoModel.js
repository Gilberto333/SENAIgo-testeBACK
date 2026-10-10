const visitasModel = require("./locaisVisitasModel")
const resgatesModel = require("./resgatesModel")

// Saldo = pontos ganhos nas visitas - pontos gastos nos resgates.
function calcularSaldo(usuarioId) {
  const pontosGanhos = visitasModel.listarVisitas()
    .filter(v => v.id === usuarioId)
    .reduce((total, v) => total + (Number(v.pontuacao) || 0), 0)

  const pontosGastos = resgatesModel.listarResgatesDoUsuario(usuarioId)
    .reduce((total, r) => total + r.pontos, 0)

  return { pontosGanhos, pontosGastos, saldo: pontosGanhos - pontosGastos }
}

module.exports = { calcularSaldo }
