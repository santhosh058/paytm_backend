const Wallet = require('../models/wallet.model');

exports.getWallet = async (userId) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new Error('Wallet not found');
  return wallet;
};

exports.addFunds = async (userId, amount) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new Error('Wallet not found');

  wallet.balance += amount;
  await wallet.save();

  return wallet;
};

exports.withdrawFunds = async (userId, amount) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) throw new Error('Wallet not found');
  if (wallet.balance < amount) throw new Error('Insufficient balance');

  wallet.balance -= amount;
  await wallet.save();

  return wallet;
};
