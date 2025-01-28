const billcontroller=require("../controllers/bill")
const express=require("express")
const router=express.Router()
const {cheackUser}=require("../middelware/cheackUser")

router.post('/createbill',cheackUser, billcontroller.createBill);       
router.put('/bill/:billId',cheackUser, billcontroller.updateBill);    
router.delete('/bill/:billId',cheackUser, billcontroller.deleteBill); 
router.get('/bill/:billId', billcontroller.getBillByInvoiceNo);
router.post('/bills',cheackUser,billcontroller.getBillsBySerialNos)
router.patch('/bills/:billId',cheackUser,billcontroller.updatecreditedamount)
module.exports = router;