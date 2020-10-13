const express = require('express');
const app = express();
const port = 5000;

const {
    getAllUsers,
    getUser,
    addUser,
    deleteUser} = require('./controllers/userController');

app.use(express.json())


app.listen(port, ()=> {
    console.log(`Started server on port ${port}`)
})

/* let users = [ 
    {username: "User1", password: "PW1"}, 
    {username: "User2", password: "PW2"}, 
    {username: "User3", password: "PW3"}, 
    ]; */



app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/client/login.html');
  });


app.post('/login', (req,res)=> {
    console.log(req.body);

    let checkUsers = users.find((x) => {
        return (x.username === req.body.username && x.password === req.body.password);
    });

    checkUsers ? res.send({message: 'Login successful'}):res.send({message: 'Login failed'});
});

app.get('/users', getAllUsers);
app.post('/users', addUser);
app.get('/users/:id', getUser);
app.delete('/users/:id', deleteUser);