const {transporter}=require("../contactus/transporter");

function contactUS(req,res,form){
    
     const mailOptions = {
        from: process.env.mail,
        to: process.env.mail2, 
        subject: 'New contact Us form from SS Fixturing',
        text: `A new form from SS Fixturing:\nName: ${form.name}\nEmail: ${form.email}\nContact No.: ${form.phone}\nMessage: ${form.message}`,      
      };
     transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
          console.log("this error is appeared",error.message)
          return res.status(400).json({ error: error });
             
          }
        else{
          res.status(200).json({ message: "Your message has been submitted successfully." });
            console.log("ok")
        }
     }); 
}

module.exports={contactUS}