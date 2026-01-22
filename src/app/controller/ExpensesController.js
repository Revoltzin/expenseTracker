const ExpensesRepository = require("../repository/ExpensesRepository.js")

class ExpensesController {
    async index (req, res) {
        const userId = req.user.userId
        const expenses = await ExpensesRepository.findAllByUser(userId)
        return res.json(expenses)
    }

    async create (req, res) {
        const userId = req.user.userId
        const { title, description, price } = req.body

        if (!title) {
            return res.status(400).json({ error: "Title is required"})
        }

        const expense = await ExpensesRepository.create({ userId, title, description, price })
        return res.status(201).json(expense)
    }

    async update (req, res) {
        const userId = req.user.userId
        const { id } = req.params
        const { title, description, price, is_done } = req.body

        const existing = await ExpensesRepository.findByIdAndUser(id, userId)

        if (!existing) {
            return res.status(404).json({ error: "Expense Not Found"})
        }

        const updated = await ExpensesRepository.update({
            id,
            userId,
            title: title ?? existing.title,
            description: description ?? existing.description,
            price: price ?? existing.price,
            is_done: typeof is_done === 'boolean' ? is_done : existing.is_done,
        })

        return res.json(updated)
    }
}

module.exports = new ExpensesController()