const pool = require("../../database/index.js")
class ExpensesRepository {
    async create ({ userId, title, description, price }) {
        const query = `
        INSERT INTO expenses (user_id, title, description, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `

        const result = await pool.query(query, [userId, title, description, price])
        return result.rows[0]
    }
}

module.exports = new ExpensesRepository()