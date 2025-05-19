// src/controllers/wallet.controller.js

const Wallet = require('../models/wallet.model');
const { MESSAGES, HTTP_STATUS } = require('../config/constants');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../middlewares/logger.middleware');

exports.getWallet = async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      logger.info(`Creating wallet for user ${req.user.id}`);
      wallet = await Wallet.create({ user: req.user.id, balance: 0 });
    }

    return successResponse(res, wallet, 'Wallet retrieved successfully');
  } catch (err) {
    logger.error(`getWallet error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};

exports.addFunds = async (req, res) => {
  const { amount } = req.body;
  try {
    let wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      logger.info(`Creating wallet with initial funds for user ${req.user.id}`);
      wallet = await Wallet.create({ user: req.user.id, balance: amount });
    } else {
      wallet.balance += amount;
      await wallet.save();
    }

    return successResponse(
      res,
      { balance: wallet.balance },
      'Funds added successfully'
    );
  } catch (err) {
    logger.error(`addFunds error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      return errorResponse(res, MESSAGES.WALLET_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    if (wallet.balance < amount) {
      return errorResponse(res, MESSAGES.INSUFFICIENT_BALANCE, HTTP_STATUS.BAD_REQUEST);
    }

    wallet.balance -= amount;
    await wallet.save();

    return successResponse(
      res,
      { balance: wallet.balance },
      'Withdrawal successful'
    );
  } catch (err) {
    logger.error(`withdraw error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};
