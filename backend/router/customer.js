const express=require('express')
const router=express.Router()
const customerController=require('../controllers/customer')
const {cheackUser}=require("../middelware/cheackUser")
const { isLoggedIn } = require("../middelware/isloggedin");

router.get('/allcustomers',cheackUser,isLoggedIn,customerController.showCustomers)
router.get('/customer/:serialNo',cheackUser,isLoggedIn,customerController.showonecustomer)
router.post('/addcustomer',cheackUser,isLoggedIn,customerController.addcustomer)
router.delete('/deletecustomer/:serialNo',isLoggedIn,cheackUser,customerController.deletecustomer)
router.put('/customer/:serialNo',isLoggedIn, cheackUser,customerController.updateCustomer);
router.patch('/customer/:serialNo',isLoggedIn,cheackUser,customerController.updateAmounts)



module.exports=router;