const transactionService = require('../services/transaction.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../config/constants');

exports.sendMoney = async (req, res) => {
  const { toUserId, amount } = req.body;
  const fromUserId = req.user.id;

  try {
    const transaction = await transactionService.transferMoney({ fromUserId, toUserId, amount });

    return successResponse(res, transaction, 'Transaction successful', HTTP_STATUS.CREATED);
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.BAD_REQUEST);
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    const history = await transactionService.getTransactionHistory(req.user.id);

    return successResponse(res, history, 'Transaction history fetched');
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.SERVER_ERROR);
  }
};
