const express = require('express');
const path = require('path');
const User = require("./model/users");
const connectDb = require("./config/config");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(cookieParser())

const route = require('./Route/route');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', route);

app.listen(5100, () => {
  console.log("server running on port 5000");
});