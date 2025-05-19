// src/controllers/wallet.controller.js

const walletService = require('../services/wallet.service');
const { MESSAGES, HTTP_STATUS } = require('../config/constants');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logger = require('../middlewares/logger.middleware');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await walletService.getOrCreateWallet(req.user.id);
    return successResponse(res, wallet, 'Wallet retrieved successfully');
  } catch (err) {
    logger?.error?.(`getWallet error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};
exports.addFunds = async (req, res) => {
  try {
    const wallet = await walletService.addFundsToWallet(req.user.id, req.body.amount);
    return successResponse(
      res,
      { balance: wallet.balance },
      'Funds added successfully'
    );
  } catch (err) {
    logger?.error?.(`addFunds error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};

exports.withdraw = async (req, res) => {
  try {
    const wallet = await walletService.withdrawFromWallet(req.user.id, req.body.amount);
    return successResponse(
      res,
      { balance: wallet.balance },
      'Withdrawal successful'
    );
  } catch (err) {
    logger?.error?.(`withdraw error: ${err.message}`);
    return errorResponse(res, err.message, HTTP_STATUS.SERVER_ERROR);
  }
};
