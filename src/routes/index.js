const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const walletRoutes = require('./wallet.routes');
const transactionRoutes = require('./transaction.routes');

router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
