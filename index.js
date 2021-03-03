const express = require('express');
const app = express();
const morgan = require('morgan');
const user = require('./api/user');

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
// res.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', user);

module.exports = app;
