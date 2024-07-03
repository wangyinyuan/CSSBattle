const jwt = require('jsonwebtoken');
const apiConfig = require('../../config/api');
const { getResResult } = require('../../utils/api');

function tokenHandler(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send(getResResult(401, 'No authorization token provided'));
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token in handler:', token)
    const decoded = jwt.verify(token, apiConfig.jwtKey);
    req.user = decoded;
    console.log('user:', decoded);
    next();
  } catch (e) {
    const message = e instanceof jwt.JsonWebTokenError ? 'Invalid token' : 'Unauthorized';
    res.status(401).send(getResResult(401, message));
  }
}

module.exports = {
  tokenHandler,
}