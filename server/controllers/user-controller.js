const pool = require('./connection.js');

async function findUser(req, res) {
    try {
        const username = pool.escape(req.params.username)
        if (username === "") {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = `SELECT username FROM app_user WHERE username = ${username}`;
            const [result, fields] = await pool.query(q);
            if (result[0]) {
                res.status(200).json({ success: true, data: result[0], message: "Found user" });
            } else {
                res.status(404).json({ success: false, message: "Did not find user" })
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error finding user" });
    }
};


async function addUser(req, res) {
    try {
        const username = pool.escape(req.body.username)
        const password = req.body.password
        if (!username || !password) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = `INSERT INTO app_user(username, pwd) VALUES (${username}, '${password}')`;
            const [result, fields] = await pool.query(q)
            if (result.affectedRows === 1) {
                res.status(201).json({ success: true, message: "User added successfully" });
            } else {
                res.status(500).json({ success: false, message: "Error adding user" });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error adding user" });
    }
};

module.exports = {
    findUser: findUser,
    addUser: addUser,
};