// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Attach decoded token data (like user ID) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token.' }); // Use 401 for invalid token
  }
};

module.exports = authMiddleware;

