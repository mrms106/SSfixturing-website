const billcontroller=require("../controllers/bill")
const express=require("express")
const router=express.Router()
const {cheackUser}=require("../middelware/cheackUser")
const { isLoggedIn } = require("../middelware/isloggedin");

router.post('/createbill',cheackUser,isLoggedIn, billcontroller.createBill);       
router.put('/bill/:billId',cheackUser,isLoggedIn, billcontroller.updateBill);    
router.delete('/bill/:billId',cheackUser,isLoggedIn, billcontroller.deleteBill); 
router.get('/bill/:billId', billcontroller.getBillByInvoiceNo);
router.post('/bills',cheackUser,isLoggedIn,billcontroller.getBillsBySerialNos)
router.patch('/bills/:billId',cheackUser,isLoggedIn,billcontroller.updatecreditedamount)
router.get('/lastbill',cheackUser,isLoggedIn,billcontroller.lastbill)
module.exports = router;