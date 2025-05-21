const transactionService = require('../services/transaction');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../config/constants');

const User = require('../models/user.model'); // adjust path if needed

exports.sendMoney = async (req, res) => {
  const { toUserName, amount } = req.body; // now expecting `toUserName` instead of `toUserId`
  const fromUserId = req.user.id;

  try {
    // Step 1: Find the recipient user by name
    const recipient = await User.findOne({ name: toUserName });

    if (!recipient) {
      return errorResponse(res, 'Recipient user not found', HTTP_STATUS.NOT_FOUND);
    }

    const toUserId = recipient._id;

    // Step 2: Proceed with money transfer
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
