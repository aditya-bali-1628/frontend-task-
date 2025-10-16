const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../utils/validators');

/**
 * @route POST /api/v1/auth/register
 * @desc register
 */
router.post('/register', registerValidator, authCtrl.register);

/**
 * @route POST /api/v1/auth/login
 * @desc login
 */
router.post('/login', loginValidator, authCtrl.login);

module.exports = router;
