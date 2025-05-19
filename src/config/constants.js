// src/config/constants.js

const constants = {
  SUCCESS: 'success',
  FAILURE: 'failure',

  USER_ROLES: {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    MERCHANT: 'merchant',
  },

  TRANSACTION_STATUS: {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
  },

  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },

  MESSAGES: {
    AUTH_FAILED: 'Authentication failed',
    UNAUTHORIZED: 'Unauthorized access',
    USER_EXISTS: 'User already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid email or password',
    WALLET_NOT_FOUND: 'Wallet not found',
    INSUFFICIENT_BALANCE: 'Insufficient wallet balance',
  },
};

module.exports = constants;
