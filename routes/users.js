const userRouter = require('express').Router();

const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const { profileValidation, avatarValidation, userIdValidation } = require('../middlewares/requestValidation');

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', userIdValidation, getUser);
userRouter.patch('/me', profileValidation, updateProfile);
userRouter.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = userRouter;
