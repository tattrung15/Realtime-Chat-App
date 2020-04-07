const express = require('express');
const router = express.Router();

const loginController = require('../controller/login.controller');

const authMiddleWare = require('../middleware/auth.middleware');

router.get('/login', authMiddleWare.auth, loginController.login);

router.get('/logout', loginController.logout);

router.post('/login', loginController.postLogin);

module.exports = router;