const billcontroller=require("../controllers/bill")
const express=require("express")
const router=express.Router()

router.post('/createbill', billcontroller.createBill);       
router.put('/bill/:invoiceNo', billcontroller.updateBill);    
router.delete('/bill/:billId', billcontroller.deleteBill); 
router.get('/bill/:billId', billcontroller.getBillByInvoiceNo);
router.post('/bills',billcontroller.getBillsBySerialNos)
router.patch('/bills/:billId',billcontroller.updatecreditedamount)
module.exports = router;