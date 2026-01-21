const pool = require('../../database/index.js')
const bcrypt = require("bcrypt")

class ExpenseRepository {
    async findByEmail (email) {
        const query = 'SELECT * FROM users WHERE email = $1'
        const result = await pool.query(query, [email])
        return result.rows[0] || null
    }
}

module.exports = new ExpenseRepository()