const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/login-controller.js');

router.route('/login')
    .post(ctrl.loginUser)

module.exports = router;