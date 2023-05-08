const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteCardLike,
} = require('../controllers/cards');
const { cardIdValidation, cardValidation } = require('../middlewares/requestValidation');

cardRouter.get('/', getCards);
cardRouter.post('/', cardValidation, createCard);
cardRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidation, deleteCardLike);

module.exports = cardRouter;
