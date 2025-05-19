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
 *               - toUserId
 *               - amount
 *             properties:
 *               toUserId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Transaction successful
 *       400:
 *         description: Insufficient balance
 *       401:
 *         description: Unauthorized
 *
 * /transaction/history:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history
 *       401:
 *         description: Unauthorized
 */
router.post('/send', protect, transactionController.sendMoney);
router.get('/history', protect, transactionController.transactionHistory);


module.exports = router;
