const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

db.defaults({
    users: []
}).write()

exports.getAllUsers = (req, res) => {
    let users = db.get("users").value()
    console.log("get users route called");
    console.log(req.params);
    res.send(users)
}

exports.getUser = (req, res) => {
    const {id} = req.params

    //find user with given id in json file
    const user = db.get("users").find({id: id}).value()

    console.log("single user route called");
    console.log(req.params);

    if(!user)
        res.send({err: `No user with id ${id}`})
    else {
        res.send(user)
    }
}

exports.addUser = (req, res) => {
    const user = req.body 
    
    //generate unique id
    user.id = Date.now().toString()

    console.log("post route called");
    console.log(req.body);
    
    //add user to JSON file
    db.get("users").push(user).write()

    res.send(user)
}

exports.updateUser = (req, res) => {
    const {id} = req.params
    const userData = req.body 
    
    console.log("ID: ", id);
    console.log("UserData posted", userData)
    
    //update user in json
    const user = db.get("users").find({id}).assign(userData).write()

    console.log("update route called");
    console.log(req.params);

    res.send({
        user, 
        message: `User with ${id} has been updated`,
    })
}

exports.deleteUser = (req, res) => {
    const {id} = req.params

    //delete from json
    let userDeleted = db.get("users").remove({id}).write()

    console.log("delete route called");
    console.log(req.params);

    res.send({
        user: userDeleted,
        message: `User with ${id} has been deleted`,
    })
}
