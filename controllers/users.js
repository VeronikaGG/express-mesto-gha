const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { CREATE_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const User = require('../models/user');

// возвращение всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};
// поиск пользователя по id
const getUserById = (req, res, data, next) => {
  User.findById(data)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
// получение информации о конкретном пользователе
module.exports.getUser = (req, res, next) => {
  const data = req.params.userId;
  getUserById(req, res, data, next);
};

// получение информации о текущем пользователе
module.exports.getUserInfo = (req, res, next) => {
  const data = req.user._id;
  getUserById(req, res, data, next);
};
// создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(CREATE_CODE).send(data);
    })
    .catch(next);
};
// обновление информации о пользователе в БД
const updateUser = (req, res, data, next) => {
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

// обновление информ о пользователе
module.exports.updateUserProfile = (req, res, next) => {
  const data = req.body;
  updateUser(req, res, data, next);
};

// обновление аватара
module.exports.updateUserAvatar = (req, res, next) => {
  const data = req.body;
  updateUser(req, res, data, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};
