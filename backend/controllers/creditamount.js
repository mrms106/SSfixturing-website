const CREDITA = require('../modules/billcamount');

// Create or append credit entry
exports.addCredit = async (req, res) => {
  const { billId } = req.params;
  const { date, amount } = req.body;

  try {
    let credit = await CREDITA.findOne({ where: { billId } });

    if (!credit) {
      credit = await CREDITA.create({
        billId,
        creditAmount: [{ date, amount }]
      });
    } else {
      // Reassign a new array (not mutate existing one)
      const updatedCredits = Array.isArray(credit.creditAmount)
        ? [...credit.creditAmount, { date, amount: parseFloat(amount) }]
        : [{ date, amount: parseFloat(amount) }];

      credit.set('creditAmount', updatedCredits); // important!
      const savedCredit = await credit.save();
      return res.status(200).json({ message: 'Credit entry updated', data: savedCredit });
    }

    res.status(200).json({ message: 'Credit entry saved', data: credit });
  } catch (err) {
    res.status(500).json({ message: 'Error adding credit', error: err.message });
  }
};

// Delete one credit entry by index
exports.deleteEntryByDate = async (req, res) => {
  const { billId } = req.params;
  const { index } = req.body;

  try {
    const credit = await CREDITA.findOne({ where: { billId } });

    if (!credit || !Array.isArray(credit.creditAmount)) {
      return res.status(404).json({ message: 'No credit record found' });
    }

    if (index < 0 || index >= credit.creditAmount.length) {
      return res.status(400).json({ message: 'Invalid index' });
    }

    const updatedArray = [...credit.creditAmount];
    updatedArray.splice(index, 1);

    // if (updatedArray.length === 0) {
    //   await credit.destroy();
    //   return res.status(200).json({ message: 'All entries deleted as only one existed' });
    // }

    credit.setDataValue('creditAmount', updatedArray); // ✅ Force update array
    const updatedCredit = await credit.save();

    res.status(200).json({ message: 'Credit entry removed', updated: updatedCredit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting entry', error: err.message });
  }
};

// Delete all entries for a billId
exports.deleteAllByBillId = async (req, res) => {
  const { billId } = req.params;

  try {
    const result = await CREDITA.destroy({ where: { billId } });

    if (result === 0) {
      return res.status(404).json({ message: 'No such billId found' });
    }

    res.status(200).json({ message: 'All credit entries deleted for this billId' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting bill', error: err.message });
  }
};

exports.getCreditByBillId = async (req, res) => {
  const { billId } = req.params;
  try {
    const credit = await CREDITA.findOne({ where: { billId } });
    if (!credit) return res.status(404).json({ message: 'Not found' });
    res.json(credit);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};