const Bills=require('../modules/bill')


function generateSerialNumber() {
    return Math.random().toString().slice(2, 25);
  }

module.exports.createBill = async (req, res) => {
    const {
        cname, caddress, cgst, cmail, cContact,
        serialNo, invoiceNo, PoNo, invoicedate, Podate, item,isOutside
    } = req.body;
   const billId=generateSerialNumber()
    try {
        // Ensure `item` is an array and contains valid entries
        if (!Array.isArray(item) || item.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array' });
        }

        // Create the new bill
        const newBill = await Bills.create({
            cname, caddress, cgst, cmail, cContact,
            serialNo, invoiceNo, PoNo, invoicedate, Podate, item,billId,isOutside
        });

        res.status(201).json({ message: 'Bill created successfully', data: newBill });
    } catch (err) {
        console.error(err.message, err);
        res.status(500).json({ error: 'Failed to create bill', details: err.message });
    }
};

module.exports.updateBill = async (req, res) => {
    const { invoiceNo } = req.params; // Bill identified by `invoiceNo`
    const { item, ...otherData } = req.body; // Separate `item` from other data

    try {
        const bill = await Bills.findOne({ where: { invoiceNo } });

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        // Update the bill
        const updatedData = {
            ...otherData,
        };

        if (item && Array.isArray(item)) {
            updatedData.item = item; // Include the updated `item` if provided
        }

        const updatedBill = await bill.update(updatedData);
        res.status(200).json({ message: 'Bill updated successfully', data: updatedBill });
    } catch (err) {
        console.error(err.message, err);
        res.status(500).json({ error: 'Failed to update bill', details: err.message });
    }
};


module.exports.deleteBill = async (req, res) => {
    const { billId } = req.params;

    try {
        // Find the bill using the `billId` column
        const bill = await Bills.findOne({ where: { billId } });

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        // Delete the bill
        await bill.destroy();
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
        console.error('Error deleting bill:', err);
        res.status(500).json({ error: 'Failed to delete bill', details: err.message });
    }
};

// Fetch a single bill by invoiceNo
module.exports.getBillByInvoiceNo = async (req, res) => {
    const { billId } = req.params; // Extract invoiceNo from request parameters
    // console.log("Request Invoice No:", invoiceNo, typeof invoiceNo);

    try {
        // Convert to string (if necessary) to avoid type mismatch issues
        const bill = await Bills.findOne({
            where: { billId: billId.toString() }, // Ensure correct format
        });

        console.log("Fetched Bill:", bill);

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill fetched successfully', data: bill });
    } catch (err) {
        console.error('Error fetching bill:', err);
        res.status(500).json({ error: 'Failed to fetch bill', details: err.message });
    }
};

// Fetch multiple bills by serialNo
module.exports.getBillsBySerialNos = async (req, res) => {
    const { serialNo } = req.body; // Expect an array of serial numbers in the request body
    try {
        const bills = await Bills.findAll({ where: { serialNo: serialNo } }); // Query for all matching serialNos
        if (bills.length === 0) {
            return res.status(404).json({ error: 'No bills found for the provided serial numbers.' });
        }

        res.status(200).json({ message: 'Bills fetched successfully', data: bills });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch bills', details: err.message });
    }
};

module.exports.updatecreditedamount=async(req,res)=>{
    const { billId } = req.params;
    const { creditedAmount } = req.body;
  
    try {
      // Update only the creditedAmount field
      const bill = await Bills.update(
        { creditedAmount }, 
        { where: { billId } }
      );
  
      if (bill[0] === 0) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.status(200).json({ message: 'Credited amount updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update credited amount', error });
    }
}