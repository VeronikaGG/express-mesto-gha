const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/me', getUserInfo);

module.exports = router;
