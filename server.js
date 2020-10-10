const express = require("express");
const app = express();
const PORT = 5000;

// database
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./data/db.json");
const db = low(adapter);
// db.defaults({ users: []}).write();
const shortid = require("shortid");

// Middleware
app.use(express.json());

// let users = [
//   { username: "User1", password: "PW1" },
//   { username: "User2", password: "PW2" },
//   { username: "User3", password: "PW3" },
// ];

app.listen(PORT, () => console.log(`Node listening on ${PORT}`));

// app.get("/login", (req, res) =>
// res.sendFile(__dirname + "/client/login.html"))

// app.post("/login", (req, res) => {
//     console.log(req.body)

//     const { username, password } = req.body
//     const user = users.find(item => item.username === username)

//     if (user && user.password === password) {
//         res.send({ message: 'Login successful' })
//     } else {
//         res.send({ message: "Login failed" });
//     }
// }
// )

// +++++ Task 2 +++++

app.post("/users", (req, res) => {
  console.log("POST Route /users was called");
  console.log(req.body);
  let { name } = req.body;
  if (name) {
    db.get("users").push({ id: shortid.generate(), name: name }).write();
    res.json(db);
  } else {
    console.log(`name: ${name}`);
    res.send("no 'name' defined");
  }
});

app.get("/users", (req, res) => {
  console.log(db.get("users").value());
  res.json(db.get("users").value());
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  res.json(db.get("users").find({ id: id }).value());
});

app.patch("/users/:id", (req, res) => {
  console.log(req.params.id);
  let { id } = req.params;
  let { name } = req.body;
  let user = db.get("users").find({ id: id }).value();
  if (user && name) {
    db.get("users").find({ id: id }).assign({ name: name }).write();
    res.json(db.get("users").value());
  } else {
    res.send(user ? "no name specified" : "no valid id");
  }
});

app.delete("/users/:id", (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  let user = db.get("users").find({ id: id }).value();
  if (user) {
    db.get("users").remove({ id: id }).write();
    res.json(db.get("users").value());
  } else {
      res.send('user not found')
  }
});
