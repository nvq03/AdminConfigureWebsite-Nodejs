const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    image: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
});

const Blog = new mongoose.model("blog",Schema)

module.exports=Blog