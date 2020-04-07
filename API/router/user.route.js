const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');

router.get('/v1/user', userController.allUser);

module.exports = router;