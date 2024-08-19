const {transporter}=require("./transporter")



function sendOtp(email,otp){
    const logoUrl = 'https://ssfixturing.com/assets/sslogo-DJIuhvMn.png';
   const sendOtpMail=({
    from:process.env.mail,
    to:email,
    subject:" E-mail Verification Via Otp- SSFIxturing",
    
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
            <div style="text-align: center;">
                <img src="${logoUrl}" alt="SS Fixturing Logo" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #333; text-align: center;">Your OTP for Email Verification</h2>
            <div style="margin: 30px 0; text-align: center;">
                <p style="font-size: 20px; color: #000;">Your OTP is:</p>
                <p style="font-size: 24px; color: #000; font-weight: bold;">${otp}</p>
            </div>
            <div style="color: #555; line-height: 1.6;">
                <p><strong>Note:</strong></p>
                <ul>
                    <li>This OTP is valid for 5 minutes.</li>
                    <li>Do not share this OTP with anyone.</li>
                    <li>If you did not request this OTP, please ignore this email.</li>
                </ul>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://www.ssfixturing.com" style="color: #0066cc; text-decoration: none;">Website</a> |
                <a href="https://www.ssfixturing.com/contact" style="color: #0066cc; text-decoration: none;">Contact Us</a>
            </div>
            <footer style="margin-top: 30px; text-align: center; color: #999;">
                <p>&copy; 2024 SS Fixturing. All rights reserved.</p>
                <p style="margin-top: 10px;">Contact us at: <a href="mailto:ssfixturing1@gmail.com" style="color: #0066cc; text-decoration: none;">ssfixturing1@gmail.com</a> | Phone: <a href="tel:+919604233567" style="color: #0066cc; text-decoration: none;">+91 9604233567</a></p>
            </footer>
        </div>
        `

   })
   try{
   transporter.sendMail(sendOtpMail,(err,info)=>{
    if(err){
        return console.log(err)
    }else{
        console.log('Message sent: %s');
    }
   })}catch(error){
    console.log("the error in sending otp is",error)
    throw error; 
   }
}
module.exports={sendOtp}