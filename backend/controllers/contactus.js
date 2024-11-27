
const {contactUS}=require("../contactus/contactus")
const{sendUser}=require("../contactus/senduser")
const axios = require('axios');
const contactForm=require("../modules/contctForm");


module.exports.contactusrouter = async (req, res) => {
    // console.log("respoce is get")
    const form = req.body
    // const recaptchaResponse = req.body['g-recaptcha-response'];
    const newform= new contactForm({
        name:form.name,
        email:form.email,
        phone:form.phone,
        message:form.message
    })
    // if (!recaptchaResponse) {
    //     return res.status(400).json({ error: "Please click on 'I am not a robot' and try again." });
    // }

    // const secretKey = process.env.captcha; // Replace with your reCAPTCHA secret key
    // const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
        // Verify the reCAPTCHA response
        // const recaptchaResult = await axios.post(verificationURL);
        // if (  !recaptchaResult.data.success) {
        //     return res.status(400).json({ error: "reCAPTCHA verification failed. Please try again." });
        // }
        await newform.save()
        await contactUS(req, res, form);
        await sendUser(form);
        console .log("the form is submitted")
        return res.status(200).json({ message: "Your message has been submitted successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occurred during form submission." });
    }
};
