// const { CastError, ValidationError } = require('mongoose').Error;
// const { BAD_REQUEST, ERROR_CODE, CONFLICT_ERROR } = require('../utils/constants');
// const NotFoundError = require('../errors/notFoundError');
// const ForbiddenError = require('../errors/forbiddenError');
// const UnauthorizedError = require('../errors/authorizationError');

const handelErrors = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

module.exports = handelErrors;
