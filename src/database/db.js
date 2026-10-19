require("dotenv").config()

const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.connect()
    .then(() => {
        console.log("✅ Conectado ao banco Neon!")
    })
    .catch((erro) => {
        console.error("❌ Erro ao conectar:", erro.message)
    })

module.exports = pool