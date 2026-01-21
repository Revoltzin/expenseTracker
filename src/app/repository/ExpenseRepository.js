const pool = require('../../database/index.js')
const bcrypt = require("bcrypt")

class ExpenseRepository {
    async findByEmail (email) {
        const query = 'SELECT * FROM users WHERE email = $1'
        const result = await pool.query(query, [email])
        return result.rows[0] || null
    }

    async create({ name, email, password }) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
        `
        const result = await pool.query(query, [name, email, hashedPassword])
        return result.rows[0]
    }
}

module.exports = new ExpenseRepository()