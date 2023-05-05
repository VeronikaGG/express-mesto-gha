const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');
// const auth = require('../middlewares/auth');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', NotFoundError);
module.exports = router;
