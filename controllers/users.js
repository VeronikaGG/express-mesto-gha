const { handleError } = require('../errors/errors');
const User = require('../models/user');

// возвращение всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => handleError(res, err));
};

// возвращение пользователя по id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Неверный идентификатор пользователя' });
      }
      return handleError(res, err);
    });
};

// создание пользователя

module.exports.createUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (!name || !about) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => handleError(res, err));
};

// обновление профиля пользователя
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (!name || !about) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => handleError(res, err));
};

// обновление аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (!avatar) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => handleError(res, err));
};
