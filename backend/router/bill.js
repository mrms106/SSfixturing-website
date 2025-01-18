const billcontroller=require("../controllers/bill")
const express=require("express")
const router=express.Router()

router.post('/createbill', billcontroller.createBill);       
router.put('/bill/:invoiceNo', billcontroller.updateBill);    
router.delete('/bill/:invoiceNo', billcontroller.deleteBill); 
router.get('/bill/invoice/:invoiceNo', billcontroller.getBillByInvoiceNo);
module.exports = router;