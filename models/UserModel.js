const mongoose = require("mongoose");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

const UserModel = new mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
