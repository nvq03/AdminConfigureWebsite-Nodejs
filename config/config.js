const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/test");

connect.then(()=>{
  console.log("connected database");
})
.catch(()=> {
    console.log("erorr connect");
});

// const LoginSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     }
// });

// const collection = new mongoose.model("user", LoginSchema);

// module.exports = collection;