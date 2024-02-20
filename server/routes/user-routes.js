const express = require('express');
const auth = require('../utils/authentication.js');

const router = express.Router();
const ctrl = require('../controllers/user-controller.js');

router.route('/users')
    .post(ctrl.addUser)
    .put(auth, ctrl.updateUser)

router.route('/users/:username')
    .get(ctrl.findUser)
    .delete(auth, ctrl.deleteUser)

module.exports = router;