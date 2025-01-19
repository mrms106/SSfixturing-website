const Bills=require('../modules/bill')

module.exports.createBill = async (req, res) => {
    const {
        cname, caddress, cgst, cmail, cContact,
        serialNo, invoiceNo, PoNo, invoicedate, Podate,
        description, hsn, unitRate, Qty, UOM,
        tax, disc, totalAmount, taxamount, grandTotal,basicvalue
    } = req.body;
    console.log(req.body,cname)

    try {
        const newBill = await Bills.create({
            cname, caddress, cgst, cmail, cContact,
            serialNo, invoiceNo, PoNo, invoicedate, Podate,
            description, hsn, unitRate, Qty, UOM,
            tax, disc, totalAmount, taxamount, grandTotal,basicvalue
        });
        res.status(201).json({ message: 'Bill created successfully', data: newBill });
    } catch (err) {
        console.log(err.message,err)
        res.status(500).json({ error: 'Failed to create bill', details: err.message });
    }
};

module.exports.updateBill = async (req, res) => {
    const { invoiceNo } = req.params; // Assuming the bill is identified by a unique ID
    const updatedData = req.body;

    try {
        const bill = await Bills.findByPk(invoiceNo);

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        const updatedBill = await bill.update(updatedData);
        res.status(200).json({ message: 'Bill updated successfully', data: updatedBill });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update bill', details: err.message });
    }
};

module.exports.deleteBill = async (req, res) => {
    const { invoiceNo } = req.params;

    try {
        const bill = await Bills.findByPk(invoiceNo);

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        await bill.destroy();
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete bill', details: err.message });
    }
};
// Fetch a single bill by invoiceNo
module.exports.getBillByInvoiceNo = async (req, res) => {
    const { invoiceNo } = req.params; // Extract invoiceNo from request parameters

    try {
        const bill = await Bills.findOne({ where: { invoiceNo } });

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({ message: 'Bill fetched successfully', data: bill });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bill', details: err.message });
        console.log(err)
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
