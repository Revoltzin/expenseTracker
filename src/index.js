const express = require("express")

const app = express()

const expensesRoutes = require("./expenses.routes.js")
const routes = require("./routes.js")

app.use(express.json())
app.use(routes)
app.use(expensesRoutes)

app.listen(3000, () => {
    console.log("Server is running")
})