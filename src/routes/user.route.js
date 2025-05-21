// routes/user.route.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
