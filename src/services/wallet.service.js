// src/services/wallet.service.js

const Wallet = require('../models/wallet.model');
const { MESSAGES } = require('../config/constants');

exports.getOrCreateWallet = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({ user: userId, balance: 0 });
  }
  return wallet;
};

exports.addFundsToWallet = async (userId, amount) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({ user: userId, balance: amount });
  } else {
    wallet.balance += amount;
    await wallet.save();
  }
  return wallet;
};

exports.withdrawFromWallet = async (userId, amount) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    throw new Error(MESSAGES.WALLET_NOT_FOUND);
  }

  if (wallet.balance < amount) {
    throw new Error(MESSAGES.INSUFFICIENT_BALANCE);
  }

  wallet.balance -= amount;
  await wallet.save();

  return wallet;
};
