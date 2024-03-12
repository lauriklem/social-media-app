const express = require('express');
const auth = require('../utils/authorization.js');

const router = express.Router();
const ctrl = require('../controllers/post-controller.js');

router.use(auth.authorizationMiddleware);

router.route('/posts')
    .get(ctrl.getAllPosts)
    .post(ctrl.addPost)
    .put(ctrl.updatePost)

router.route('/posts/:postid')
    .get(ctrl.findPostById)
    .delete(ctrl.deletePost)

module.exports = router;