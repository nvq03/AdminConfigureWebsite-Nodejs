const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const collection = new mongoose.model("user", LoginSchema);
