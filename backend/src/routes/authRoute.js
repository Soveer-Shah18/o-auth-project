const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport")
const authRouter = express.Router();

authRouter.get("/check", (req, res) => {

  const token = req.cookies?.token;

  if (!token) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.JWT_KEY);
    return res.sendStatus(200);
  } 
  catch (err) {
    return res.sendStatus(401);
  }

});

authRouter.get("/google", passport.authenticate("google",{
  scope: ["profile", "email"],
}))


authRouter.get("/google/callback",
  passport.authenticate("google", {session: false}),
  (req,res)=>{

    const user = req.user;

    const token = jwt.sign(
      {_id: user._id,
        emailId: user.emailId,
        firstName: user.firstName,
      },
      process.env.JWT_KEY,
      {expiresIn: "15m"})


      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
      })

      res.redirect("http://localhost:5173/homepage")
  }
)

module.exports = authRouter;