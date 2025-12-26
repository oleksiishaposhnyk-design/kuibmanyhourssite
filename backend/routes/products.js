const express = require('express');
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// List products
router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Create product (admin)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const p = await Product.create({ title, description, price, image });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
