const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const { protect } = require('../middlewares/auth.middleware');

// router.get('/', protect, walletController.getWallet);
// router.post('/add-funds', protect, walletController.addFunds);
router.post('/withdraw', protect, walletController.withdraw);

module.exports = router;

/**
 * @swagger
 * /wallet:
 *   get:
 *     summary: Get user wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet fetched
 *       404:
 *         description: Wallet not found
 */
router.get('/', protect, walletController.getWallet);
/**
 * @swagger
 * /wallet/add-funds:
 *   post:
 *     summary: Add funds to wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Funds added
 */

router.post('/add-funds', protect, walletController.addFunds);
