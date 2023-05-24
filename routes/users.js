const router = require('express').Router();

const {
  getUsers, getUser, getUserProfile, updateUserInfo, updateUserAvatar, signOut,
} = require('../controllers/users');
const { profileValidation, avatarValidation, userIdValidation } = require('../middlewares/requestValidation');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.delete('/me', signOut);
router.get('/:userId', userIdValidation, getUser);
router.patch('/me', profileValidation, updateUserInfo);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
