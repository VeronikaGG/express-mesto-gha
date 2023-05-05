const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
module.exports = router;
