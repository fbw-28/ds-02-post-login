const express = require("express")
const app = express()
const PORT = 5000

// Middleware
app.use( express.json())

let users = [
  { username: "User1", password: "PW1" },
  { username: "User2", password: "PW2" },
  { username: "User3", password: "PW3" },
];

app.listen(PORT, () => console.log(`Node listening on ${PORT}`))

app.get("/login", (req, res) =>
res.sendFile(__dirname + "/client/login.html"))

app.post("/login", (req, res) => {
    console.log(req.body)

    const { username, password } = req.body
    const user = users.find(item => item.username === username)

    if (user && user.password === password) {
        res.send({ message: 'Login successful' })
    } else {
        res.send({ message: "Login failed" });
    }
}
)