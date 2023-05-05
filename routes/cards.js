const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardsValidation, cardValidation } = require('../middlewares/requestValidation');

router.get('/', getCards);
router.post('/', cardsValidation, createCard);
router.delete('/:cardId', cardValidation, deleteCard);
router.put('/:cardId/likes', cardValidation, likeCard);
router.delete('/:cardId/likes', cardValidation, dislikeCard);

module.exports = router;
