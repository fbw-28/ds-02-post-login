const express = require("express");
const app = express();
const port = 5000;

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/db.json");
const db = low(adapter);

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

db.defaults({
  users: [],
}).write();

app.use(express.json());

let users = [
  { username: "User1", password: "PW1" },
  { username: "User2", password: "PW2" },
  { username: "User3", password: "PW3" },
];

app.get("/", (req, res) => {
  res.send("it is working");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/client/login.html");
});

app.post("/login", (req, res) => {
  console.log(req.body);

  let exist = users.find((item) => {
    return (
      item.username === req.body.username && item.password === req.body.password
    );
  });
  console.log(exist);
  if (exist) {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Login failed" });
  }
});

//  exerxise 2



app.post("/users", (req, res) => {
  const user = req.body;

  user.id = Date.now().toString();

  db.get("users").push(user).write();
  res.send(user);
});
app.get("/users", (req, res) => {
  let users = db.get("users").value();
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const singleUser = db.get("users").find({ id }).value();
  console.log(singleUser);
  if (singleUser) {
    res.send(singleUser);
  } else {
    res.send({
      message: "no user with this id",
    });
  }
});
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const updatedUser = db.get("users").find({ id }).assign(userData).write();
  res.send(req.body);
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("users").remove({ id }).write();
  res.send(id);
});
