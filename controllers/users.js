const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  OK_CODE,
  CREATE_CODE,
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_CODE,
} = require('../utils/constants');

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
    .orFail()
    .then((user) => res.send(user))
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

// обновление профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((user) => {
      res.status(OK_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// обновление аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((user) => {
      res.status(OK_CODE).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
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
