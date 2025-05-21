const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { MESSAGES } = require('../config/constants');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: MESSAGES.NO_TOKEN });
  }

  const token = authHeader.split(' ')[1]; // Extract token part

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: MESSAGES.USER_NOT_FOUND });
    next();
  } catch (error) {
    res.status(401).json({ message: MESSAGES.INVALID_TOKEN });
  }
};
