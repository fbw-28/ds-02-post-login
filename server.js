const express = require("express");
// const teachers = require("./data");

const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

let users = [
  { username: "User1", password: "PW1" },
  { username: "User2", password: "PW2" },
  { username: "User3", password: "PW3" },
];

app.post("/login", (req, res) => {
  console.log("CALLING THE POST ROUTE!!!");
  console.log(req.body);
  if (users.length > 0 && users.find((user) => user === req.body.username)) {
    console.log("Login successful");
  } else {
    console.log("Login failed");
  }
  res.json({
    message: "User logged in successfully.",
  });
});

app.get("/", (req, res) => {
  res.send();
});
