const {
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_CODE,
} = require('../errors/errors');
const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      res
        .status(ERROR_CODE)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

// создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
// удаляет карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
// поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((likes) => {
      res.status(200).send({ data: likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res.status(NOT_FOUND).send({ message: 'Запрашиваемый объект не найден' });
    })
    .then((likes) => {
      res.status(200).send({ data: likes });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(ERROR_CODE)
          .send({ message: 'На сервере произошла ошибка' });
      }
    });
};
