const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const swaggerSpec = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares/error.middleware');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Enable Cross-Origin Resource Sharing
app.use(helmet());       // Secure HTTP headers
app.use(morgan('dev'));  // Logging

// API Routes
app.use('/api', apiRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Root endpoint
app.get('/', (req, res) => {
  res.send('Paytm Backend API is running ✅');
});

// Error handling middleware (should be last)
app.use(errorHandler);

module.exports = app;
