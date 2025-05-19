const cron = require('node-cron');
const Wallet = require('../models/wallet.model');
const User = require('../models/user.model');
const logger = require('../middlewares/logger.middleware'); // Optional logger

// Run every day at 12:00 AM
cron.schedule('0 0 * * *', async () => {
  console.log('[🕐 CRON] Wallet Sync Job Running - Midnight');

  try {
    const wallets = await Wallet.find().populate('user');

    for (const wallet of wallets) {
      if (wallet.balance < 10) {
        console.warn(
          `[⚠️ ALERT] Low balance for user ${wallet.user.email} - ₹${wallet.balance}`
        );
        // Optionally notify user here via email or push
      }

      // Add additional checks/logic if needed
    }

    console.log('[✅ CRON] Wallet Sync Completed Successfully');
  } catch (error) {
    console.error('[❌ CRON ERROR] Wallet Sync Failed:', error.message);
    if (logger) logger.error(error); // if you have logger
  }
});
