const User = require("../modules/user");
const passport = require('passport');
const {loginmail}=require("../contactus/loginmail")
const otpData=require("../modules/otpData")
const { Op } = require('sequelize');


module.exports.signuprouter=async (req, res) => {
    try {
      const { username, email, password,otp } = req.body;

      const otpRecord = await otpData.findOne({
        where: {
          email,
          otpcode: otp,
          expiresat: {
            [Op.gt]: new Date(),  // Ensure OTP has not expired
          },
        },
      });
      if(!otpRecord){
        return res.status(400).render({ errorMessage: 'Invalid or expired OTP' });
      }

      const newUser = new User({ username, email });
      User.register(newUser, password, (err, user) => {
        if (err) {
          console.error("Error signing up user:", err);
        return res.status(400).json({ errorMessage: err.message });
        }
        passport.authenticate("local")(req, res, () => {
          res.status(200).json({ successMessage: 'User registered successfully' });
        });
      });
    } catch (err) {
      console.error("Error signing up user:", err);
    res.status(500).json({ errorMessage: 'Internal Server Error or otp is incorrect' });
    }
  }


module.exports.loginrouter=(req,res,next)=>{  passport.authenticate('local', (err,user,info)=>{
  if(err){
      return res.status(500).json({ message: 'An error occurred during authentication' });
  }
  if(!user){
      return res.status(401).json({ message: 'Invalid username or password' });
  }
  req.logIn(user, (err) => {
      if (err) { 
          return res.status(500).json({ message: 'An error occurred during login' });
      }
      res.status(200).json({
          message: "Login successful",
          redirectUrl: "/upload"  // You can adjust this URL as needed
      });
  });
})(req, res, next)}

module.exports.logout=(req, res) => {
    req.logOut((err) => {
      if (err) {
        // return next(err);
       return console.log(err)
      }
      res.status(200).json({ successMessage: 'User logout success' });
    });
  }