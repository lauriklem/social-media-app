const express = require('express');

const router = express.Router();
const ctrl = require('../controllers/user-controller.js');

router.route('/users')
    .post(ctrl.addUser)
    .put(ctrl.updateUser)

router.route('/users/:username')
    .get(ctrl.findUser)
    .delete(ctrl.deleteUser)

module.exports = router;