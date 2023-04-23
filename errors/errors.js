const { ValidationError, DocumentNotFoundError, CastError } = require('mongoose').Error;

module.exports.handleError = (err, req, res) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ message: err.message });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(404).send({ message: 'Документ не найден' });
  }
  if (err instanceof CastError) {
    return res.status(400).send({ message: 'Неверный формат идентификатора' });
  }
  return res.status(500).send({ message: err.message });
};
const CREATE_CODE = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const ERROR_CODE = 500;

module.exports = {
  CREATE_CODE,
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_CODE,
};
