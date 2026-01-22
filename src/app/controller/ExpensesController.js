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
}

module.exports = new ExpensesController()