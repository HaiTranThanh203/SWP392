const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/list', userController.getAllUsersPaginate);
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id/toggle-active', userController.toggleUserActiveStatus);
module.exports = router;
