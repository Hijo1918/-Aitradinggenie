const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token.replace('Bearer ', ''), jwtSecret);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};
