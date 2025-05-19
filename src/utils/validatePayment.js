// Simulate payment gateway callback validation
const validatePayment = (paymentDetails) => {
  const { amount, transactionId } = paymentDetails;

  if (!transactionId || !amount || amount <= 0) {
    return { valid: false, message: 'Invalid payment data' };
  }

  // You can enhance this for checksum/hash verification
  return { valid: true };
};

module.exports = validatePayment;
