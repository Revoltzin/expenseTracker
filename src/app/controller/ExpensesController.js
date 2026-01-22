const ExpensesRepository = require("../repository/ExpensesRepository.js")

class ExpensesController {
    async index (req, res) {
        const userId = req.user.userId
        const expenses = await ExpensesRepository.findAllByUser(userId)
        return res.json(expenses)
    }
    
}

module.exports = new ExpensesController()