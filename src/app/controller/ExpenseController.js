const ExpenseRepository = require("../repository/ExpenseRepository.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class ExpenseController {
    async create(req, res) {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(404).json({ error: "Name, email and Password required"})
        }

        const existAccount = await ExpenseRepository.findByEmail(email)

        if (existAccount) {
            return res.status(400).json({ error: "This email is already taken"})
        }

        const newUser = await ExpenseRepository.create({ name, password, email })

        return res.status(201).json(newUser)
    }
}

module.exports = new ExpenseController()