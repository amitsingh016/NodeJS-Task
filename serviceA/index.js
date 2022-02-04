const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config()
const createUser = require('./create-user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/create-user', createUser);

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})