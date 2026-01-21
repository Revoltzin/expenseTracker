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

    async login (req, res) {
        const { email, password } = req.body

        if (!email) {
            return res.status(404).json({ error: "Email is required"})
        }

        const user = await ExpenseRepository.findByEmail(email)

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!user || !passwordMatch) {
            return res.status(401).json({ error: "Invalid Credentials"})
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )

        return res.json({ token })
    }
}

module.exports = new ExpenseController()