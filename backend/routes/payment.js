const express = require('express');
const { base64, signature } = require('../utils/liqpay');
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// Create liqpay checkout data and create Order
router.post('/create', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order_id = `order_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    const order = await Order.create({
      user: req.user.id,
      product: product._id,
      amount: product.price,
      order_id,
      status: 'pending'
    });

    const params = {
      version: "3",
      public_key: process.env.LIQPAY_PUBLIC,
      action: "pay",
      amount: product.price.toFixed(2),
      currency: "UAH",
      description: `Payment for ${product.title}`,
      order_id,
      result_url: `${process.env.BASE_URL}/success`,
      server_url: `${process.env.BASE_URL}/api/payment/callback`
    };

    const data = base64(params);
    const sign = signature(process.env.LIQPAY_PRIVATE, data);

    res.json({ data, signature: sign, public_key: process.env.LIQPAY_PUBLIC, orderId: order._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Callback endpoint for LiqPay (server to server)
router.post('/callback', express.urlencoded({ extended: false }), async (req, res) => {
  try {
    const { data, signature: sign } = req.body;
    const serverSign = signature(process.env.LIQPAY_PRIVATE, data);
    if (sign !== serverSign) return res.status(400).send('Invalid signature');

    const payload = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
    const order = await Order.findOne({ order_id: payload.order_id });
    if (!order) return res.status(404).send('Order not found');

    if (payload.status === 'success') {
      order.status = 'paid';
      await order.save();
      console.log(`Order ${order.order_id} paid successfully`);
    } else {
      order.status = 'failed';
      await order.save();
      console.log(`Order ${order.order_id} payment failed`);
    }

    res.send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
