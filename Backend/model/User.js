const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    username: String,
    password: String
})

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel;