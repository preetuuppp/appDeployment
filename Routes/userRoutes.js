const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

//Registering the users
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.json({ msg: "something went wrong" });
      } else {
        const user = new userModel({ name, email, pass: hash });
        await user.save();
        res.json({ msg: "user successfully registered", user: req.body });
      }
    });
  } catch (error) {
    res.json({ msg: "not resistering user" });
  }
});

//logging in the user  { userID: user._id, user: user.name }, process.env.secret
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user._id, user: user.name }, "masai");
          res.json({ msg: "Successfully logged in", token });
        } else {
          res.json({ error: "Failed to log in" });
        }
      });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  userRouter,
};
