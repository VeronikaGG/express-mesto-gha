const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: `Ошибка: ${err}` }));
};

// создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ message: `Ошибка: ${err}` }));
};

// удаляет карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => res.status(500).send({ message: `Ошибка: ${err}` }));
};
// поставить лайк карточке
module.exports.likeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => res.status(400).send({ message: `Ошибка: ${err}` }));
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send(card);
    })
    .catch((err) => res.status(400).send({ message: `Ошибка: ${err}` }));
};
