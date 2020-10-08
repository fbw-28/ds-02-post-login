const express = require('express')
const app = express()
const port = 5000

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

const {getAllUsers, getUser, addUser} = require('./controllers/usersController')

//middleware
app.use(express.json())

const hello = (req, res) => {
    res.send({ welcome: "Welcome to user DB"})
}

//Routes
//home page
app.get('/', hello)

//all users
app.get('/users',(req, res) => {
    console.log("get users route called");
    console.log(req.params);
    res.send({ users: [{id: "123", name: "Rob"}]})
})

//sign up a new user
app.post('/users',(req, res) => {
    console.log("post route called");
    console.log(req.body);
    res.send({ users: [{id: "123", name: "Rob"}]})
})

//a single user by id
app.get('/users/:id',(req, res) => {
    console.log("single user route called");
    console.log(req.params);
    res.send({ users: [{id: "123", name: "Rob"}]})
})

//update existing user by id
app.patch('/users/:id',(req, res) => {
    console.log("update route called");
    console.log(req.params);
    res.send({ users: [{id: "123", name: "Rob"}]})
})

//delete existing user by id
app.delete('/users/:id',(req, res) => {
    console.log("delete route called");
    console.log(req.params);
    res.send({ users: [{id: "123", name: "Rob"}]})
})


/* ex 2
let users = [ 
    {username: "User1", password: "PW1"}, 
    {username: "User2", password: "PW2"}, 
    {username: "User3", password: "PW3"}
]
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

}) */

