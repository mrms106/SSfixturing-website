const {transporter}=require("../contactus/transporter");

function sendUser(form) {
  const mailOptions = {
    from: process.env.mail,
    to: form.email,
    subject: 'Thank you for Visiting SS Fixturing',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #0056b3; text-align: center;">Thank you for visiting SS Fixturing!</h2>
      <p style="text-align: center;">We appreciate you reaching out to us. Our team will get back to you as soon as possible.</p>
      <p style="text-align: center;">SS Fixturing is a leading manufacturer of hydraulic and mechanical fixtures. Learn more about us by visiting our <a href="https://www.ssfixturing.com/" style="color: #0056b3;">website</a>.</p>
      <p style="text-align: center; color: #777; font-size: 0.9em;">This email is computer generated.</p>
      <footer style="margin-top: 20px; text-align: center;">
        <p style="font-size: 0.8em; color: #999;">&copy; 2024 SS Fixturing. All rights reserved.</p>
      </footer>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

module.exports={sendUser}