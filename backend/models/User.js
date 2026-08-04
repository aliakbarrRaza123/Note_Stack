const mongoose = require("mongoose")
const {Schema} = mongoose;

const UserSchema = new Schema ({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    // unique : true    // Mongoose ne Mongodb se kaha unique index bnado 
  },
  password : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    default : Date.now
  }
})

// mongoose.model('name','schema')
const User = mongoose.model("user",UserSchema);
module.exports = User;
