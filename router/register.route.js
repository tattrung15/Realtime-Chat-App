const express = require('express');
const router = express.Router();

const signUpController = require('../controller/register.controller');

router.get('/', signUpController.signup);

router.post('/', signUpController.postSignup);

module.exports = router;