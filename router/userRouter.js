const express = require("express");
const router = express.Router();
const {users} = require("../users");

router.get("/login", (req,res)=>{
    res.send(users);
})

router.post("/login",(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password);
    const checkUser = users.find(user=>user.username===username);
    if(checkUser){
        const checkPassword = password === checkUser.password;
        if(checkPassword){
            res.send({message: `${username} you are logged in`})
        } else {
            res.send({message: "Wrong password"})
        }
    } else {
        res.send({message: "No user with this name..."})
    }
})

module.exports = router;