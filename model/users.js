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

const User = mongoose.model("users", LoginSchema); // Tạo đối tượng mô hình từ mô hình và schema

module.exports = User;