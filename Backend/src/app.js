const express = require('express');
const cors = require('cors');

require('./db/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', require('./routes/user'));
app.use('/products', require('./routes/product'));
app.use('/messages', require('./routes/message'));

module.exports = app;
