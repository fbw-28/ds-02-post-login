const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

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
  }
  res.send({ message: "Login failed" });
});
