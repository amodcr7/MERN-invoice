const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateUserId } = require('../utils/userUtils');

exports.createUser = async (req, res) => {
  const { name, email, password, role, groupId } = req.body;
  const creator = req.user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUserId(role);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      createdBy: creator.id,
      groupId,
      userId,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().limit(100); // Pagination can be added
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
