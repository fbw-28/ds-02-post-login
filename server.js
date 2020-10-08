const express = require('express');
const users = require('./data');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(users);
});

app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  const user = users.find(
    (user) => user.username === userName && user.password === password
  );

  user
    ? res.send('User logged in successfully')
    : res.send('User login failed');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
