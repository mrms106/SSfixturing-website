const express=require('express')
const router=express.Router()
const customerController=require('../controllers/customer')

router.get('/allcustomers',customerController.showCustomers)
router.get('/customer/:serialNo',customerController.showonecustomer)
router.post('/addcustomer',customerController.addcustomer)
router.delete('/deletecustomer/:serialNo',customerController.deletecustomer)
router.put('/customer/:serialNo', customerController.updateCustomer);



module.exports=router;