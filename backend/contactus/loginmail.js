const {transporter}=require("../contactus/transporter");

function loginmail(req,res){
    
     const mailOptions = {
        from: process.env.mail,
        to: process.env.mail3, 
        subject: 'new login detected  on ss fixturing',
        text: `A new LOgin on SSfixturing`,      
      };
     transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
             res.render("./pages/error.ejs", { error: error.message });
            //  console.log("this error is appeared",error.message)
          }
        else{
            res.render("./pages/thanku.ejs");
            // console.log("ok")
        }
     }); 
}

module.exports={loginmail}