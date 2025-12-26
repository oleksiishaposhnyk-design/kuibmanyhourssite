const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.adminOnly = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No user' });
  const user = await User.findById(req.user.id);
  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};
