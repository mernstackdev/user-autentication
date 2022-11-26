const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    default: false,
  },
  isAdming: {
    type: String,
    default: false,
  },
  accountActivationToken: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("Users", userSchema);

exports.User = User;
