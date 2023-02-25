var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
require("dotenv").config();

// signup
const signup = async (req, res) => {
  const { profilePicture,bio,name, email,phone, password } = req.body;
  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    res.send({ msg: "User already exist,logging in" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong, please try again later" });
      }
      const new_user = new UserModel({
        profilePicture,
        bio,
        name,
        email,
        phone,
        password: hash,
      });

      try {
        await new_user.save();
        res.send({ msg: "Sign up successfull", password: hash });
      } catch (err) {
        res.send({ msg: "something went wrong please try again" });
      }
    });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hashed_password = user.password;
  const user_id = user._id;

  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      res.send({ mag: "something went wrong,try again later" });
    }
    const token = jwt.sign({ user_id: user_id }, process.env.SECRET_KEY);
    if (result) {
      res.send({ msg: "Login successfull", token });
    } else {
      res.send({ msg: "Login Failed" });
    }
  });
};

const getProfile = async (req, res) => {
  const { user_id } = req.body;
  const user = await UserModel.findOne({ _id: user_id });
  const {profilePicture,bio, name, email,phone } = user;
  res.send({profilePicture,bio, name, email ,phone});
};


const editProfile = async (req, res) => {
  const { name, email, phone, bio, profilePicture } = req.body;
  const user_id = req.user_id;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          name,
          email,
          phone,
          bio,
          profilePicture,
        },
      },
      { new: true }
    );

    const { profilePicture: newProfilePicture, bio: newBio, name: newName, email: newEmail, phone: newPhone } = updatedUser;
    res.send({ newProfilePicture, newBio, newName, newEmail, newPhone });
  } catch (err) {
    res.send({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = {
  editProfile,
  signup,
  login,
  getProfile
};
