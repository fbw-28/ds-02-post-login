const express = require('express')
const {addUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require("./lowdb")
const app = express()
const port = 5000;

//const {  } = require('./controllers/usersController');


//MIDDLEWARE to prase JSON
app.use(express.json())

app.listen(port, () => {
    console.log(`Hurray! Server started at http://localhost:${port}`)
})

// let users = [{
//     username: "User1",
//     password: "PW1"
// }, {
//     username: "User2",
//     password: "PW2"
// }, {
//     username: "User3",
//     password: "PW3"
// }, ]

const sayHello = (req, res) => {
    res.send('<h1>Welcome to our API</h1>');
};

// app.get('/login', (req, res) => {
//     console.log("Login Form called")

//     // construct an absolute path to that goddam file
//     // why? because sendFile does not allow RELATIVE (./) paths
//     res.sendFile(__dirname + '/ui/login.html')
// })



// app.post('/login', (req, res) => {
//     console.log('Route /login called');
//     console.log(req.body.username)
//     console.log(req.body.username)

//     const {
//         username,
//         password
//     } = req.body;
 
//     const exists = users.find(user => user.username === username && user.password === password)

//     console.log('hello', exists)

//     res.json(exists ? {
//         message: "Login successful"
//     } : {
//         message: "Login failed"
//     });
// });

/** ROUTES **/
app.get('/', sayHello);

app.get('/users', getAllUsers);
app.post('/users', addUser);
app.get('/users/:id', getUserById);
app.patch('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);
