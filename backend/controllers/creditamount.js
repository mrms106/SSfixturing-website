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
      const updated = Array.isArray(credit.creditAmount) ? credit.creditAmount : [];
      updated.push({ date, amount });
      credit.creditAmount = updated;
      await credit.save();
    }

    res.status(200).json({ message: 'Credit entry saved', data: credit });
  } catch (err) {
    res.status(500).json({ message: 'Error adding credit', error: err.message });
  }
};

// Delete one credit entry by date
exports.deleteEntryByDate = async (req, res) => {
  const { billId } = req.params;
  const { date } = req.body;

  try {
    const credit = await CREDITA.findOne({ where: { billId } });

    if (!credit || !Array.isArray(credit.creditAmount)) {
      return res.status(404).json({ message: 'No credit record found' });
    }

    const filtered = credit.creditAmount.filter(entry => entry.date !== date);

    if (filtered.length === 0) {
      await credit.destroy();
      return res.status(200).json({ message: 'All entries deleted as only one existed' });
    }

    credit.creditAmount = filtered;
    await credit.save();

    res.status(200).json({ message: 'Credit entry removed', updated: credit });
  } catch (err) {
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
