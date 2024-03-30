const express = require('express');
const auth = require('../utils/authorization.js');

const router = express.Router();
const postCtrl = require('../controllers/post-controller.js');
const commentCtrl = require('../controllers/comment-controller.js')

router.route('/posts')
    .get(auth.authorizationMiddleware, postCtrl.getAllPosts)
    .post(auth.authorizationMiddleware, postCtrl.addPost)
    .put(auth.authorizationMiddleware, postCtrl.updatePost)

router.route('/posts/:postid')
    .get(auth.authorizationMiddleware, postCtrl.findPostById)
    .delete(auth.authorizationMiddleware, postCtrl.deletePost)

router.route('/users/:username/posts')
    .get(auth.authorizationMiddleware, postCtrl.getAllPostsByName)

router.route('/posts/:postid/comments')
    .get(auth.authorizationMiddleware, commentCtrl.getCommentsByPostid)
    .post(auth.authorizationMiddleware, commentCtrl.addComment)

module.exports = router;