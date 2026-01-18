const Router = require("express")
const ExpenseController = require("./app/controller/ExpenseController")

const router = Router()

// public route

router.post("/register", ExpenseController.create)

// private Route

router.post("/login", ExpenseController.login)

module.exports = router