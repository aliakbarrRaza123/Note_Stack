// models folder contains schema (logical collection of database objects)
const mongoose = require("mongoose")
const {Schema} = mongoose;

const NotesSchema = new Schema ({
  // 'user' as a foreign key (to check notes related to which user)
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  tag : {
    type : String,
    default : "General"
  },
  date : {
    type : Date,
    default : Date.now
  }
})

// mongoose.model('name','schema')
module.exports = mongoose.model("notes",NotesSchema);