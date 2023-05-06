const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
// const NotFoundError = require('../errors/notFoundError');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', auth, (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
module.exports = router;
