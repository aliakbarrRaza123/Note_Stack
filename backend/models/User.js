const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { 
    type: String,
    required: true 
  },
  email: {
    type: String, 
    required: true 
    // unique : true    // Mongoose ne Mongodb se kaha unique index bnado 
  },
  password: {
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  resetPasswordToken: { 
    type: String 
  },
  resetPasswordExpire: { 
    type: Date 
  },
});

// When a user document is deleted, also remove their notes.
async function cascadeDeleteNotes(userId) {
  const Notes = mongoose.model("notes");
  await Notes.deleteMany({ user: userId });
}

// this.getFilter() gives the condition to find user like email.
UserSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await cascadeDeleteNotes(doc._id);
  }
});

// user document ke through delete kro jab.
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await cascadeDeleteNotes(this._id);
  },
);

// query ke through delete kro jab.
UserSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
      await cascadeDeleteNotes(doc._id);
    }
  },
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
