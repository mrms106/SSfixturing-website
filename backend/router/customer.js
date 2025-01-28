const express=require('express')
const router=express.Router()
const customerController=require('../controllers/customer')
const {cheackUser}=require("../middelware/cheackUser")

router.get('/allcustomers',cheackUser,customerController.showCustomers)
router.get('/customer/:serialNo',cheackUser,customerController.showonecustomer)
router.post('/addcustomer',cheackUser,customerController.addcustomer)
router.delete('/deletecustomer/:serialNo',cheackUser,customerController.deletecustomer)
router.put('/customer/:serialNo', cheackUser,customerController.updateCustomer);
router.patch('/customer/:serialNo',cheackUser,customerController.updateAmounts)



module.exports=router;