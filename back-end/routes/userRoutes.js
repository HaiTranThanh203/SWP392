const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/:id', userController.getUserById);
router.get('/list', userController.getAllUsersPaginate);
router.patch('/:id/toggle-active', userController.toggleUserActiveStatus);
router.patch('/:id/toggle-active', userController.toggleUserActiveStatus);
module.exports = router;
