const creditController= require('../controllers/creditamount')
const express = require('express');
const router = express.Router();

// POST: Add or append credit
router.post('/add/:billId', creditController.addCredit);

// DELETE: Remove a single entry by date
router.delete('/delete-entry/:billId', creditController.deleteEntryByDate);

// DELETE: Remove all entries for a billId
router.delete('/delete-bill/:billId', creditController.deleteAllByBillId);

router.get('/show/:billId', creditController.getCreditByBillId);

module.exports = router;