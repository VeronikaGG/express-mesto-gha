const { celebrate, Joi } = require('celebrate');
const { REGEXP } = require('../utils/constants');

module.exports.usersValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});
module.exports.avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REGEXP).required(),
  }),
});

module.exports.userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});
module.exports.cardsValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(REGEXP),
  }),
});

module.exports.cardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});
