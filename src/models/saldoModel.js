const db = require("../database/db")

async function calcularSaldo(usuarioId) {

    const ganhos = await db.query(
        `
        SELECT
            COALESCE(SUM(pontuacao),0) AS total
        FROM visitas
        WHERE usuario_id = $1
        `,
        [usuarioId]
    )

    const gastos = await db.query(
        `
        SELECT
            COALESCE(SUM(pontos),0) AS total
        FROM resgates
        WHERE usuario_id = $1
        `,
        [usuarioId]
    )

    const pontosGanhos = Number(ganhos.rows[0].total)
    const pontosGastos = Number(gastos.rows[0].total)

    return {
        pontosGanhos,
        pontosGastos,
        saldo: pontosGanhos - pontosGastos
    }
}

module.exports = {
    calcularSaldo
}