const low = require('lowdb')
const FileSync = require ('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)


db.defaults({users:[]}).write()

exports.addUser = (req, res) => {
    const user = req.body;
    user.id = Date.now().toString()
    db.get("users").push(user).write()
    res.send(user)
};

exports.getUser = (req, res) => {
    const { id } = req.params;
    const user = db.get("users").find({id:id}).value()
    user ? res.send(user): res.send({err: `No user with id ${id}`});

}

exports.getAllUsers = (req, res) => {
    let users = db.get("users").value()
    res.send(users);
  };

exports.deleteUser = (req, res) => {
    const {id} = req.params;
    let userDeleted = db.get("users").remove({id}).write()
    res.send({
        user:userDeleted,
        message:`User with id ${id} has been deleted!`
    })

}
