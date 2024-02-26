const express = require('express');
const auth = require('../utils/authorization.js');

const router = express.Router();
const ctrl = require('../controllers/user-controller.js');

router.route('/users')
    .post(ctrl.addUser)
    .put(auth.authorizationMiddleware, ctrl.updateUser)

router.route('/users/:username')
    .get(ctrl.findUser)
    .delete(auth.authorizationMiddleware, ctrl.deleteUser)

module.exports = router;