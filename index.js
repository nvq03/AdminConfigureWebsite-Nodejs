const express = require('express');
const path = require('path');
const collection = require("./model/users");
const connectDb = require("./config/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const route = require('./Route/route');

app.use('/', route);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
