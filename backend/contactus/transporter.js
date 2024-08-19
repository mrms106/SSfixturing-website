

const nodemailer=require("nodemailer");

// mail send
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.mail, 
        pass: process.env.pass 
    },
    // logger: true,
    // debug: true
});

module.exports={transporter}
