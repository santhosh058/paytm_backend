const app = require('./app');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
})();

