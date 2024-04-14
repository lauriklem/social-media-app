const pool = require('./connection.js');
const dataUtils = require('../utils/data-utils.js');

/**
 * Finds one post by ID.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function findPostById(req, res) {
    try {
        const postid = req.params.postid;
        if (postid == null) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = `SELECT p.postid, p.username, p.created, c.contentid, c.ctype, c.content 
            FROM post p JOIN content_of_post c
            ON p.postid = c.postid
            WHERE p.postid = ?
            ORDER BY c.contentid`;
            const [result, fields] = await pool.execute(q, [postid]);
            if (result.length > 0) {
                const postArray = dataUtils.postsToArray(result);
                res.status(200).json({ success: true, data: postArray, message: "Found post" });
            } else {
                res.status(404).json({ success: false, message: "Did not find post" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error finding post" });
    }
}

/**
 * Gets all posts in the db.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function getAllPosts(req, res) {
    try {
        const q = `SELECT p.postid, p.username, p.created, c.contentid, c.ctype, c.content 
        FROM post p JOIN content_of_post c
        ON p.postid = c.postid
        ORDER BY p.postid DESC, c.contentid`;
        const [result, fields] = await pool.execute(q);
        if (result.length > 0) {
            const postArray = dataUtils.postsToArray(result);
            res.status(200).json({ success: true, data: postArray, message: "Found posts" });
        } else {
            res.status(404).json({ success: false, message: "Did not find any posts" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error getting posts" });
    }
}

/**
 * Gets all posts in the db by username.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function getAllPostsByName(req, res) {
    try {
        const username = req.params.username;
        const q = `SELECT p.postid, p.username, p.created, c.contentid, c.ctype, c.content 
        FROM post p JOIN content_of_post c
        ON p.postid = c.postid
        WHERE p.username = ?
        ORDER BY p.postid DESC, c.contentid`;
        const [result, fields] = await pool.execute(q, [username]);
        if (result.length > 0) {
            const postArray = dataUtils.postsToArray(result);
            res.status(200).json({ success: true, data: postArray, message: "Found posts" });
        } else {
            res.status(404).json({ success: false, message: "Did not find any posts" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error getting posts" });
    }
}

/**
 * Adds new post to db.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function addPost(req, res) {
    try {
        const username = req.body.username;
        const created = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const contentArray = req.body.contentArray;
        if (!username || !contentArray || username.length === 0 || contentArray.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            // Create new post to post table
            let q = 'INSERT INTO post(username, created) VALUES (?, ?) RETURNING postid';
            const [result_post, fields_post] = await pool.execute(q, [username, created]);
            const postid = result_post[0].postid;

            // Add the content of the post to content_of_post table
            for (let i = 0; i < contentArray.length; i++) {
                const c = contentArray[i]
                q = 'INSERT INTO content_of_post(contentid, postid, ctype, content) VALUES (?, ?, ?, ?)'
                const [result, fields] = await pool.execute(q, [i + 1, postid, c.ctype, c.content]);
                if (result.affectedRows === 0) {
                    res.status(500).json({ success: false, message: "Error adding content of post" });
                    return;
                }
            }
            res.status(201).json({ success: true, message: "Post added successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error adding post" });
    }
}

/**
 * Updates the content of a post in db.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function updatePost(req, res) {
    try {
        const postid = req.body.postid;
        const updatedArray = req.body.updatedArray;
        const newArray = req.body.newArray;
        if (postid == null || (updatedArray && updatedArray.length === 0) || (newArray && newArray.length === 0)) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            // Check that post exists
            let q = 'SELECT * FROM content_of_post WHERE postid = ?';
            const [result, fields] = await pool.execute(q, [postid]);
            if (!result[0]) {
                res.status(404).json({ success: false, message: "Did not find post" });
            } else {
                const previousRows = result.length; // Current number of content for this post

                // Update old content
                if (updatedArray) {
                    for (let i = 0; i < updatedArray.length; i++) {
                        const c = updatedArray[i];
                        const q = 'UPDATE content_of_post SET ctype = ?, content = ? WHERE postid = ? AND contentid = ?';
                        const [result, fields] = await pool.execute(q, [c.ctype, c.content, postid, i + 1]);
                        if (result.affectedRows === 0) {
                            res.status(500).json({ success: false, message: "Error updating content of post" });
                            return;
                        }
                    }
                }

                // Add new content
                if (newArray) {
                    for (let i = 0; i < newArray.length; i++) {
                        const c = newArray[i]
                        q = 'INSERT INTO content_of_post(contentid, postid, ctype, content) VALUES (?, ?, ?, ?)'
                        const [result, fields] = await pool.execute(q, [i + previousRows + 1, postid, c.ctype, c.content]);
                        if (result.affectedRows === 0) {
                            res.status(500).json({ success: false, message: "Error updating content of post" });
                            return;
                        }
                    }
                }
                res.status(200).json({ success: true, message: "Post updated successfully" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error updating post" });
    }
}

/**
 * Deletes a post from db.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function deletePost(req, res) {
    try {
        const postid = req.params.postid;
        if (postid == null) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = 'DELETE FROM post WHERE postid = ?';
            const [result, fields] = await pool.execute(q, [postid]);
            if (result.affectedRows >= 1) {
                res.status(200).json({ success: true, message: "Deleted post" });
            } else {
                res.status(404).json({ success: false, message: "Did not find post" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error deleting post" });
    }
}

module.exports = {
    findPostById: findPostById,
    getAllPosts: getAllPosts,
    getAllPostsByName: getAllPostsByName,
    addPost: addPost,
    updatePost: updatePost,
    deletePost: deletePost,
}