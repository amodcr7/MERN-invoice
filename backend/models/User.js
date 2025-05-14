const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['SUPERADMIN', 'ADMIN', 'UNIT_MANAGER', 'USER'] },
  createdBy: String,
  groupId: String,
});

module.exports = mongoose.model('User', userSchema);
