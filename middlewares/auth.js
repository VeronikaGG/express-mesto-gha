const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  req.user = {};
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    try {
      const payload = jwt.verify(token, 'super-strong-secret');
      req.user = payload;
      next();
    } catch (err) { next(new AuthorizationError('token')); }
    return;
  }
  next(new AuthorizationError('header'));
};
