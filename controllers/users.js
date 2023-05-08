const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { OK_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
        .send({ message: 'Аутентификация успешна!' });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const findUserById = (req, res, data, next) => {
  User.findById(data)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const data = req.params.userId;
  findUserById(req, res, data, next);
};

const getUserProfile = (req, res, next) => {
  const data = req.user._id;
  findUserById(req, res, data, next);
};

// Добавление пользователя с существующим email в БД
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(OK_CODE).send(userData);
    })
    .catch(next);
};

const handleUserUpdate = (req, res, data, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const data = req.body;
  handleUserUpdate(req, res, data, next);
};

const updateUserAvatar = (req, res, next) => {
  const data = req.body;
  handleUserUpdate(req, res, data, next);
};

module.exports = {
  getUsers,
  getUser,
  getUserProfile,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
