const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: String, required: true },
  gender: { type: String, required: true },
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
