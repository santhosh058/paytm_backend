const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/send', protect, transactionController.sendMoney);
router.get('/history', protect, transactionController.transactionHistory);


module.exports = router;
