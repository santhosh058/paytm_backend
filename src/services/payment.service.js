const Wallet = require('../models/wallet.model');
const Transaction = require('../models/transaction.model');

exports.transferMoney = async ({ fromUserId, toUserId, amount }) => {
  const senderWallet = await Wallet.findOne({ user: fromUserId });
  const receiverWallet = await Wallet.findOne({ user: toUserId });

  if (!senderWallet || !receiverWallet) throw new Error('One or both wallets not found');
  if (senderWallet.balance < amount) throw new Error('Insufficient funds');

  // Deduct and add balance
  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  // Record transaction
  const transaction = await Transaction.create({
    from: fromUserId,
    to: toUserId,
    amount,
    status: 'completed',
  });

  return transaction;
};

exports.getTransactionHistory = async (userId) => {
  return Transaction.find({ $or: [{ from: userId }, { to: userId }] }).sort({ createdAt: -1 });
};
