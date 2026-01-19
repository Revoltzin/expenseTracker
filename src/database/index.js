const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

module.exports = pool

// Criar o DB em schema 
// Criar as rotas que faltam e ajustar o controller e o repository para as rotas privadas
// criar o auth.js no middleware