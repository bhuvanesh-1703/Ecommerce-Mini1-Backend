const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, required: true },
  phonenumber: { type: Number },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
  status: { type: String, default: "Active" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
