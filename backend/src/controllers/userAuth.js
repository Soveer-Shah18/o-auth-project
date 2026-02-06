const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {

    validate(req.body);

    const {emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, firstName: user.firstName},process.env.JWT_KEY,{ expiresIn: "15m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    const reply = {
      firstName: user.firstName,
      emailId: user.emailId,
      _id: user._id,
    };

    res.status(201).json({
      user: reply,
      message: "Registered Successfully",
      token, 
    });

  } 
  catch (err) {
    res.status(400).json({ message: err.message || "Registration failed" }); 
  }
};


const login = async (req,res)=>{

    try{
        const {emailId, password} = req.body;

        if(!emailId)
            throw new Error("Invalid Credentials");
        if(!password)
            throw new Error("Invalid Credentials");

        const user = await User.findOne({emailId});

        const match = await bcrypt.compare(password,user.password);

        if(!match)
            throw new Error("Invalid Credentials");

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
        }

        const token =  jwt.sign({_id:user._id , emailId:user.emailId, firstName: user.firstName },process.env.JWT_KEY,{expiresIn: "15m"});
        
        res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });
        
        res.status(201).json({
            user:reply,
            message:"Logged In Successfully"
        })
    }
    catch(err){
        res.status(401).send("Error: "+err);
    }
}

const logout = async(req,res)=>{

  res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })

  res.json({message: "Logged out Successfully"});

}


module.exports = {register, login , logout};