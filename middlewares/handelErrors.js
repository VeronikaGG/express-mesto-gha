const { CastError, ValidationError } = require('mongoose').Error;
const { BAD_REQUEST_ERROR_CODE, SERVER_ERROR_CODE, CONFLICT_ERROR_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const UnauthorizedError = require('../errors/authorizationError');

module.exports = ((err, req, res, next) => {
  if (err instanceof CastError || err instanceof ValidationError) {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
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
    return res.status(CONFLICT_ERROR_CODE).send({ message: 'Пользователь с таким почтовым адресом уже зарегистрирован' });
  }

  res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });

  return next();
});
