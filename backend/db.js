const mongoose = require("mongoose");

// kahiin or deploy krna hoga to sirf connection string change krdenge.
const mongoURI = "mongodb://localhost:27017/Note_Stack";

const connectToMongo = () => 
{
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to Mongo Successfully!");
    })
    .catch((err) => {
      console.error(err);
    });
};

// export hojayega function
module.exports = connectToMongo;