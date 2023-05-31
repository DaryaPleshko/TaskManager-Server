const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controller/user.controller');
const auth = require('./controller/auth.controller');
const tasks = require('./controller/taska.controller');

const app = express();

app.use(bodyParser.json());

app.use('/user', users);

app.use('/api', auth);

app.use('/task', tasks);

app.use((error, request, response, next) => response.send(error.message));

module.exports = app;