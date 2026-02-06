const express = require('express');
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userRouter =  express.Router();
const {register, login, logout} = require('../controllers/userAuth');

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.get("/me", async (req, res) => {

  const token = req.cookies?.token;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decoded._id);

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      photo: user.photo, 
    });
  } 
  catch {
    res.sendStatus(401);
  }
});

module.exports = userRouter;

