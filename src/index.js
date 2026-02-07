require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development only)
if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express Docker Backend',
    environment: NODE_ENV,
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      echo: 'POST /api/echo'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Different error responses for dev/prod
  const errorResponse = NODE_ENV === 'development' 
    ? { 
        error: err.message,
        stack: err.stack,
        path: req.path
      }
    : { 
        error: 'Something went wrong!',
        requestId: req.headers['x-request-id'] || Date.now()
      };
  
  res.status(err.status || 500).json(errorResponse);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
  ========================================
  🚀 Server is running!
  Environment: ${NODE_ENV}
  Port: ${PORT}
  URL: http://localhost:${PORT}
  ========================================
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;