const express = require('express')
const app = express()
const port = 5000

//middleware
app.use(express.json())

let users = [ 
    {username: "User1", password: "PW1"}, 
    {username: "User2", password: "PW2"}, 
    {username: "User3", password: "PW3"}
]

app.get('/', (req, res) => {
    res.send(users)
})

app.post('/users', (req,res) => {
    console.log("post users route called");
    //data from frontend
    console.log(req.body);
    res.send({
        message: 'User logged in successfully...'
    })
})

app.post('/login', (req, res) => {
    console.log("post login route called");
    let name = req.body.name;
    let password = req.body.password;
    //const {name, password} = req.body

    const searchUser = users.find(user => user.username === name && user.password === password);
    
    searchUser 
    ? res.send('Login successful') 
    : res.send('Login failed')

})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})