const express = require("express");
const app = express();
require("./server")(app)
const userRouter = require("./router/userRouter");


//middlewares
app.use(express.json({extended:true}))
app.use("/user", userRouter)