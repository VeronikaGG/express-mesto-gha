const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const { OK_CODE } = require('../utils/constants');

const Card = require('../models/card');

// возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

// создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.status(OK_CODE).send({ data: card });
    })
    .catch(next);
};

// удаляет карточку по id
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        return Card.deleteOne(card).then(() => res.send({ data: card }));
      }
    })
    .catch(next);
};
// обновление массива лайков в БД
const updateLikes = (req, res, data, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, data, { new: true })
    .orFail(() => {
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .populate(['owner', 'likes'])
    .then((likes) => {
      res.send({ data: likes });
    })
    .catch(next);
};

// поставить лайк
module.exports.likeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $addToSet: { likes: ownerId } };
  updateLikes(req, res, updateData, next);
};

// убрать лайк
module.exports.dislikeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $pull: { likes: ownerId } };
  updateLikes(req, res, updateData, next);
};
