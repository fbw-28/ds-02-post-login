const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

db.defaults({
    users: []
}).write()

exports.getAllUsers = (req, res) => {
    let users = db.get("users").value()
    res.send(users)
}

exports.getUser = (req, res) => {
    const {id} = req.params

    //find user with given id in json file
    const user = db.get("users").find({id: id}).value()
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

    //add user to JSON file
    db.get("users").push(user).write()

    res.send(user)
}