const userRouter = require('express').Router();

const {
  getUsers, getUser, getUserProfile, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const { profileValidation, avatarValidation, userIdValidation } = require('../middlewares/requestValidation');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserProfile);
userRouter.get('/:userId', userIdValidation, getUser);
userRouter.patch('/me', profileValidation, updateUserInfo);
userRouter.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = userRouter;
