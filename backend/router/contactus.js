const express=require("express");
const router=express.Router()
const conntactuscontroller=require("../controllers/contactus")

router.post("/contactUS", conntactuscontroller.contactusrouter);

module.exports=router;