const express = require('express');
const auth = require('../utils/authorization.js');

const router = express.Router();
const ctrl = require('../controllers/post-controller.js');

router.route('/posts')
    .get(auth.authorizationMiddleware, ctrl.getAllPosts)
    .post(auth.authorizationMiddleware, ctrl.addPost)
    .put(auth.authorizationMiddleware, ctrl.updatePost)

router.route('/posts/:postid')
    .get(auth.authorizationMiddleware, ctrl.findPostById)
    .delete(auth.authorizationMiddleware, ctrl.deletePost)

router.route('/posts/:username')
    .get(auth.authorizationMiddleware, ctrl.getAllPostsByName)

module.exports = router;