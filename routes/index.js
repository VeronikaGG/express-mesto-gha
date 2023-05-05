const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('*', NotFoundError);
module.exports = router;
