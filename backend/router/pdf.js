const express=require("express");
const router=express.Router()
const pdfcontroller=require("../controllers/pdf");
const { isLoggedIn } = require("../middelware/isloggedin");
const multer = require('multer');
const {cheackUser}=require("../middelware/cheackUser")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.get('/upload',cheackUser, isLoggedIn,pdfcontroller.upload);

router.post('/upload',cheackUser, upload.single('pdf'), isLoggedIn,pdfcontroller.uploadrouter);

router.get('/pdf/:serialNO', pdfcontroller.pdf);

router.delete('/pdf/:serialNO',cheackUser,isLoggedIn, pdfcontroller.pdfdelete);

module.exports=router;