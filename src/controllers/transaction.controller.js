const Transaction = require('../models/transaction.model');
const Wallet = require('../models/wallet.model');
const { TRANSACTION_STATUS, MESSAGES } = require('../config/constants');

exports.sendMoney = async (req, res) => {
  const { toUserId, amount } = req.body;
  const fromUserId = req.user.id;

  try {
    const senderWallet = await Wallet.findOne({ user: fromUserId });
    const receiverWallet = await Wallet.findOne({ user: toUserId });

    if (!senderWallet || !receiverWallet)
      return res.status(404).json({ message: MESSAGES.WALLET_NOT_FOUND });

    if (senderWallet.balance < amount)
      return res.status(400).json({ message: MESSAGES.INSUFFICIENT_BALANCE });

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save();
    await receiverWallet.save();

    const transaction = await Transaction.create({
      from: fromUserId,
      to: toUserId,
      amount,
      status: TRANSACTION_STATUS.SUCCESS,
    });

    res.status(201).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ from: req.user.id }, { to: req.user.id }],
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
