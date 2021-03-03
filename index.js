const express = require('express');
const app = express();
const morgan = require('morgan');

var users = [
  { id: 1, name: 'kim' },
  { id: 2, name: 'park' },
  { id: 3, name: 'lee' },
];

app.use(morgan('dev'));
// res.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).json({ response: 'success' });
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = { name, id };
  users.push(user);
  res.status(201).json(user);
});

app.listen(3000, function () {
  console.log('server is running');
});

module.exports = app;
