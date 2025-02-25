const express = require('express');
const { signup, login,forgotPassword,protect,changePassword,logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/change-password',protect,changePassword,);
router.get('/logout', logout);

module.exports = router;
