// corsMiddleware.js

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // Enable credentials if you're using cookies or sessions for authentication
};

module.exports = cors(corsOptions);
