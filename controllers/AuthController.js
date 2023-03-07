var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
require("dotenv").config();

// signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const isUser = await UserModel.findOne({ email });
  if (isUser) {
    res.send({ msg: "User already exist,logging in" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong, please try again later" });
      }
      const isAdmin = email.endsWith("@masaischool.com");
      if (isAdmin) {
        res.send({ msg: "admin signup success" });
      }
      const new_user = new UserModel({
        name,
        email,
        password: hash,
        isAdmin,
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
    const payload = { user_id: user_id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    if (user.isAdmin) {
      res.send({ msg: "admin Login success", token });
    }
   else if (result) {
      res.send({ msg: "Login successfull", token });
    } else {
      res.send({ msg: "Login Failed" });
    }
  });
};

const getProfile = async (req, res) => {
  const { user_id } = req.body;
  const user = await UserModel.findOne({ _id: user_id });
  const { name, email } = user;
  res.send({ name, email });
};

module.exports = {
  signup,
  login,
  getProfile,
};
