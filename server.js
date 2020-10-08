const express = require('express')
const app = express()
const port = 5000

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

const {getAllUsers, getUser, addUser, updateUser, deleteUser} = require('./controllers/usersController')

//middleware
app.use(express.json())

const hello = (req, res) => {
    res.send({ welcome: "Welcome to user DB"})
}

//Routes
//home page
app.get('/', hello)

//all users
app.get('/users', getAllUsers)

//sign up a new user
app.post('/users',addUser)

//a single user by id
app.get('/users/:id',getUser)

//update existing user by id
app.patch('/users/:id', updateUser)

//delete existing user by id
app.delete('/users/:id',deleteUser)


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

