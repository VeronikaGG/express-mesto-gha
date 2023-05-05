const { CastError, ValidationError } = require('mongoose').Error;
const {
  BAD_REQUEST,
  CONFLICT_ERROR,
  ERROR_CODE,
} = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const UnauthorizedError = require('../errors/authorizationError');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({
      message: 'Пользователь с таким почтовым адресом уже зарегистрирован',
    });
  }
  res.status(ERROR_CODE).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
  return next();
});
