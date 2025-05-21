const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const walletRoutes = require('./wallet.routes');
const transactionRoutes = require('./transaction.routes');
const profile=require('./user.route')

router.use('/auth', authRoutes);
router.use('/wallet', walletRoutes);
router.use('/transaction', transactionRoutes);
router.use('/user',profile)


module.exports = router;
