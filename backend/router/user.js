const express=require("express");
const router=express.Router()
const usercontroller=require("../controllers/user");
const passport = require('passport');
const {loginLimiter,signupLimiter,otpLimiter}=require("../middelware/loginLimit")
const { isLoggedIn } = require("../middelware/isloggedin");





router.post("/signup",signupLimiter,usercontroller.signuprouter );


router.post('/login',loginLimiter,usercontroller.loginrouter); 

router.get("/logout", usercontroller.logout);

router.get("/curruser",(req,res)=>{
    const currUser=req.user
    res.send(currUser)
})

module.exports=router;
