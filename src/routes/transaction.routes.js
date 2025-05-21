const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /transaction/send:
 *   post:
 *     summary: Send money to another user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toUserName
 *               - amount
 *             properties:
 *               toUserName:
 *                 type: string
 *                 description: Name of the recipient user
 *                 example: santhosh
 *               amount:
 *                 type: number
 *                 description: Amount to send
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Transaction successful
 *       400:
 *         description: Insufficient balance or bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipient not found
 *
 * /transaction/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history fetched successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/send', protect, transactionController.sendMoney);
router.get('/history', protect, transactionController.transactionHistory);

module.exports = router;
