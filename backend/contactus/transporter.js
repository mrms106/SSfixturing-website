

const nodemailer=require("nodemailer");

// mail send
const transporter = nodemailer.createTransport({
    host: 'mail.ssfixturing.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.mail, 
        pass: process.env.pass
    },
    // logger: true,
    // debug: true
});

module.exports={transporter}
