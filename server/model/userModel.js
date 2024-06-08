const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePhoto: {
    data: Buffer,
    contentType: String
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
