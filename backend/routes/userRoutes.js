const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, createUser);
router.get('/', authenticate, getUsers);
router.put('/:id', authenticate, updateUserRole);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
