const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Express Docker Backend'
  });
});

// Get users
router.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json(users);
});

// Get user by ID
router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = { id: userId, name: 'User ' + userId, email: `user${userId}@example.com` };
  res.json(user);
});

// Echo endpoint
router.post('/echo', (req, res) => {
  res.json({
    message: 'Received your data',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Calculate endpoint
router.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;
  
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }

  let result;
  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) return res.status(400).json({ error: 'Cannot divide by zero' });
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation. Use: add, subtract, multiply, divide' });
  }

  res.json({
    operation,
    a,
    b,
    result,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;