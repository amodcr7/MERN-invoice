const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoiceController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, createInvoice);
router.get('/', authenticate, getInvoices);
router.put('/:id', authenticate, updateInvoice);
router.delete('/:id', authenticate, deleteInvoice);

module.exports = router;
