const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    phonenumber: { type: Number },
    role: { type: String, default: "admin" },
    password: { type: String, required: true },
    status: { type: String, default: "Active" },
    role: { type: String }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
