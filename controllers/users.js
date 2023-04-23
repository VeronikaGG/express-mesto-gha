const User = require('../models/user');

// возвращение всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
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
      return res.status(500).send({ message: err.message });
    });
};

// создание пользователя
// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (!name || !about) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(
    userId,
    { name, about },
    // eslint-disable-next-line comma-dangle
    { new: true, runValidators: true }
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch(
      (err) =>
        // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
        res.status(500).send({ message: `Ошибка: ${err.message}` })
      // eslint-disable-next-line function-paren-newline
    );
};

// обновление профиля пользователя
// eslint-disable-next-line consistent-return
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (!name || !about) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(
    userId,
    { name, about },
    // eslint-disable-next-line comma-dangle
    { new: true, runValidators: true }
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch(
      (err) =>
        // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
        res.status(500).send({ message: `Ошибка: ${err.message}` })
      // eslint-disable-next-line function-paren-newline
    );
};

// обновление аватара пользователя
// eslint-disable-next-line consistent-return
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (!avatar) {
    return res.status(400).send({ message: 'Не заполнены обязательные поля' });
  }

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch(
      (err) =>
        // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
        res.status(500).send({ message: `Ошибка: ${err.message}` })
      // eslint-disable-next-line function-paren-newline
    );
};
