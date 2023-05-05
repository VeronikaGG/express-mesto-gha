const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { profileValidation, avatarValidation, userValidation } = require('../middlewares/requestValidation');

router.get('/', getUsers);
router.get('/:userId', userValidation, getUser);
router.get('/me', getUserInfo);
router.patch('/me', profileValidation, updateUserProfile);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
