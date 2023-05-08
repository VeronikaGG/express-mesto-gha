const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  const newtoken = req.cookies.jwt;

  if (!newtoken) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(newtoken, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
