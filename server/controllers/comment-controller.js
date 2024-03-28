const pool = require('./connection.js');

/**
 * Gets comments of one post by post ID.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function getCommentsByPostid(req, res) {
    try {
        const postid = req.params.postid;
        if (postid == null) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = `SELECT commentid, ctype, content, created
            FROM comment_of_post WHERE postid = ?`;
            const [result, fields] = await pool.execute(q, [postid]);
            if (result.length > 0) {
                res.status(200).json({ success: true, data: result, message: "Found comments" });
            } else {
                res.status(404).json({ success: false, message: "Did not find comments" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error getting comments" });
    }
}

/**
 * Adds new comment to db.
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 */
async function addComment(req, res) {
    try {
        const postid = req.params.postid;
        const username = req.body.username;
        const created = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const content = req.body.content;
        const ctype = req.body.ctype;
        if (postid == null || !username || !content || !ctype ||
            username.length === 0 || content.length === 0 || ctype.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            // Check that post exists
            let q = 'SELECT * FROM comment_of_post WHERE postid = ?';
            const [result_prev, fields_prev] = await pool.execute(q, [postid]);
            const previousComments = result_prev.length; // Current number of comments for this post
            
            q = `INSERT INTO comment_of_post(commentid, postid, username, ctype, content, created)
            VALUES (?, ?, ?, ?, ?, ?)`;
            const [result, fields] = await pool.execute(q, [previousComments + 1, postid, username, ctype, content, created]);
            
            if (result.affectedRows >= 1) {
                res.status(201).json({ success: true, message: "Comment added successfully" });
            } else {
                res.status(500).json({ success: false, message: "Error adding comment" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error adding comment" });
    }
}

module.exports = {
    getCommentsByPostid: getCommentsByPostid,
    addComment: addComment,
}