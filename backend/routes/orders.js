const express = require('express');
const { auth, adminOnly } = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

// Admin: list all orders
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('product', 'title price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
