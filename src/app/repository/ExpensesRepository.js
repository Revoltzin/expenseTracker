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

    async findAllByUser (userId) {
        const query = `
        SELECT id, title, description, price, is_done, created_at
        FROM expenses
        WHERE user_id = $1
        ORDER BY created_at DESC
        `

        const result = await pool.query(query, [userId])
        return result.rows
    }

    async findByIdAndUser (id, userId) {
        const query = `
        SELECT * 
        FROM expenses
        WHERE id = $1 AND user_id = $2
        `

        const result = await pool.query(query, [id, userId])
        return result.rows[0] || null
    }

    async update ({ id, userId, title, description, price, is_done }) {
        const query = `
        UPDATE expenses
        SET title = $1,
            description = $2,
            price = $3
            is_done = $4
        WHERE id = $5 AND user_id = $6
        RETURNING *
        `

        const result = await pool.query(query, [title, description, price, is_done, id, userId ])
        return result.rows[0] || null
    }

    async delete (id, user_id) {
        const query = `
        DELETE FROM expenses
        WHERE id = $1 AND user_id = $2
        RETURNING id
        `

        const result = await pool.query(query, [id, user_id])
        return result.rowCount > 0
    }
}

module.exports = new ExpensesRepository()