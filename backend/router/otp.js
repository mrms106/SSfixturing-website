
const express=require("express");
const router=express.Router()
const otpControllers=require("../controllers/emailOtp")
const {loginLimiter,signupLimiter,otpLimiter}=require("../middelware/loginLimit")


router.post("/generateOtp",otpLimiter,otpControllers.sendOtp)
module.exports=router