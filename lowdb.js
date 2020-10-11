const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({
    users: []
}).write()

//signing up new user: 

exports.addUser = (req, res) => {
    const user = req.body;
    user.id = Date.now().toString()

    db.get("users").push(user).write()

    res.send(user);
}

//getting all users: 

exports.getAllUsers = (req, res) => {
    const users = db.get("users").value();
    res.send(users);
}

//getting user by id: 

exports.getUserById = (req, res) => {
    const {id} = req.params;
    // find user with the given ID in the JSON file
  const user = db.get("users").find({ id: id }).value()
  if (!user)
    res.send({ err: `No user with id ${id}` });
  else {
    res.send(user);
  }
};

exports.updateUserById = (req, res) => {
    const { id } = req.params;
    const userData = req.body;
  
    console.log("ID: ", id)
    console.log("User data posted", userData)
  
    // update user in JSON file
    const user = db.get("users").find({ id }).assign(userData).write()
  
    res.send({
      user,
      message: `User with id ${id} has been updated!`,
    });
  };
  
  exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    
    // delete user with given ID from JSON file
    let userDeleted = db.get("users").remove({ id }).write()
  
    res.send({
      user: userDeleted,
      message: `User with id ${id} has been deleted!`,
    });
  };

