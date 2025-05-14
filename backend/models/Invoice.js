const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: Number,
  invoiceDate: Date,
  invoiceAmount: Number,
  createdBy: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
