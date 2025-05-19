const userService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../config/constants');

exports.register = async (req, res) => {
  try {
    const { user, token } = await userService.registerUser(req.body);
    return successResponse(res, { user, token }, 'User registered successfully');
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.BAD_REQUEST);
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await userService.loginUser(req.body);
    return successResponse(res, { user, token }, 'Login successful');
  } catch (error) {
    return errorResponse(res, error.message, HTTP_STATUS.UNAUTHORIZED);
  }
};
