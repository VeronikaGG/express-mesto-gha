const { celebrate, Joi } = require('celebrate');
const { REGEXP } = require('../utils/constants');

const usersValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEXP),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const profileValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const userValidation = celebrate({
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const cardValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

const avatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(REGEXP).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const cardsValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(REGEXP),
  }),
});

module.exports = {
  usersValidation,
  profileValidation,
  userValidation,
  cardValidation,
  avatarValidation,
  loginValidation,
  cardsValidation,
};
