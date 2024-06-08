const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/admin-login', authController.adminLogin);
router.post('/admin-signup', authController.adminSignup);

module.exports = router;
