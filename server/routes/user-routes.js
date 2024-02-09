const express = require('express');
const router = express.Router();

let ctrl = require('../controllers/user-controller.js');

router.route('/users')
    .post(ctrl.addUser)
    .put(ctrl.updateUser)

router.route('/users/:username')
    .get(ctrl.findUser)


module.exports = router;