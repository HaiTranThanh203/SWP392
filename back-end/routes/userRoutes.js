const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/list', userController.getAllUsersPaginate);
router.get('/search', userController.searchUsers);
// Endpoint tìm kiếm user với flag isFriend
// Ví dụ: GET http://localhost:9999/api/users/search?keyword=abc&userId=YOUR_USER_ID
router.get('/search2', userController.searchUsers)

router.get('/:id', userController.getUserById);
router.patch('/:id/toggle-active', userController.toggleUserActiveStatus);
module.exports = router;
