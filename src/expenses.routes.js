const { Router } = require("express")
const ExpensesController = require("./app/controller/ExpensesController.js")

const router = Router()

router.get('/expenses', ExpensesController.index)
router.post('/expenses', ExpensesController.create)
router.put('/expenses/:id', ExpensesController.update)
router.delete('/expenses/:id', ExpensesController.delete)

module.exports = router