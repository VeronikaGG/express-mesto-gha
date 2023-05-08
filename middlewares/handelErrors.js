const { CastError, ValidationError } = require('mongoose').Error;
const { BAD_REQUEST, ERROR_CODE, CONFLICT_ERROR } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const UnauthorizedError = require('../errors/authorizationError');

module.exports = ((err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({ message: 'Пользователь с таким email уже существует' });
  }

  res.status(ERROR_CODE).send({ message: 'На сервере произошла ошибка' });

  return next();
});
