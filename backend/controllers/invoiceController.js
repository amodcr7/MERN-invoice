const Invoice = require('../models/Invoice');
const moment = require('moment');

exports.createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, invoiceDate, invoiceAmount } = req.body;
    const creator = req.user;

    const newInvoice = new Invoice({
      invoiceNumber,
      invoiceDate,
      invoiceAmount,
      createdBy: creator.id,
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  const { financialYear, from, to, number } = req.query;
  let query = { createdBy: req.user.id };

  if (number) query.invoiceNumber = Number(number);
  if (from && to) query.invoiceDate = { $gte: new Date(from), $lte: new Date(to) };

  // Filter by financial year if provided
  if (financialYear) {
    const [startYear, endYear] = financialYear.split('-').map(Number);
    const startDate = new Date(startYear, 0, 1); // January 1st of start year
    const endDate = new Date(endYear, 11, 31);   // December 31st of end year
    query.invoiceDate = { $gte: startDate, $lte: endDate };
  }

  try {
    const invoices = await Invoice.find(query).limit(100);
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Invoice deleted' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
