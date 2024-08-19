const {sendOtp}=require("../contactus/sendOtp")
const randomstring = require('randomstring');
const otpData=require('../modules/otpData')

function generateOtp(){
    return randomstring.generate({
        length:6,
        charset:"numeric"
    })
}

module.exports.sendOtp=async(req,res)=>{
     
    const email=req.body.email;
    // console.log('Received email:', email);
    const otp=generateOtp();
    // console.log('Generated OTP:', otp); 
    const expiresAt=new Date(Date.now() + 5 * 60 * 1000); 
    try{
     await otpData.create({
        otpcode:otp,
        email:email,
        expiresat:expiresAt
     })
      await  sendOtp(email,otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Failed to send OTP', error: err.message });
    }
}