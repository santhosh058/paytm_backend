const Joi = require('joi');

const addFunds = Joi.object({
  amount: Joi.number().min(1).required(),
});

const withdraw = Joi.object({
  amount: Joi.number().min(1).required(),
});

module.exports = { addFunds, withdraw };
