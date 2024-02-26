const pool = require('./connection.js');
const bcrypt = require('bcrypt');
const auth = require('../utils/authorization.js');

async function findUser(req, res) {
    try {
        const username = req.params.username;
        if (!username || username.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = 'SELECT username FROM app_user WHERE username = ?';
            const [result, fields] = await pool.execute(q, [username]);
            if (result[0]) {
                res.status(200).json({ success: true, data: result[0], message: "Found user" });
            } else {
                res.status(404).json({ success: false, message: "Did not find user" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error finding user" });
    }
};

async function addUser(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password || username.length === 0 || password.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const hashedpw = await bcrypt.hash(password, 10);
            const q = 'INSERT INTO app_user(username, pwd) VALUES (?, ?)';
            const [result, fields] = await pool.execute(q, [username, hashedpw]);
            if (result.affectedRows >= 1) {
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

async function updateUser(req, res) {
    try {
        const oldUsername = req.body.oldUsername;
        const newUsername = req.body.newUsername;
        const newPassword = req.body.newPassword;

        const usersMatch = auth.checkUsername(req, oldUsername);

        if (!(oldUsername && (newUsername || newPassword)) || oldUsername.length === 0 || (newUsername && newUsername.length === 0) || (newPassword && newPassword.length === 0)) {
            res.status(400).json({ success: false, message: "Check input" });
        } else if (!usersMatch) {
            res.status(401).json({ success: false, message: "Unauthorized access" });
        } else {
            let q, updateArray;
            if (newPassword && newUsername) {
                const hashedpw = await bcrypt.hash(newPassword, 10);
                q = 'UPDATE app_user SET username = ?, pwd = ? WHERE username = ?';
                updateArray = [newUsername, hashedpw, oldUsername];
            } else if (newPassword) {
                const hashedpw = await bcrypt.hash(newPassword, 10);
                q = 'UPDATE app_user SET pwd = ? WHERE username = ?';
                updateArray = [hashedpw, oldUsername];
            } else {
                q = 'UPDATE app_user SET username = ? WHERE username = ?';
                updateArray = [newUsername, oldUsername];
            }
            const [result, fields] = await pool.execute(q, updateArray)
            if (result.affectedRows >= 1) {
                const token = auth.generateToken(newUsername);
                res.status(200).json({ success: true, message: "User updated successfully", token: token });
            } else {
                res.status(500).json({ success: false, message: "Error updating user" });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error updating user" });
    }
};

async function deleteUser(req, res) {
    try {
        const username = req.params.username
        const usersMatch = auth.checkUsername(req, username);

        if (!username || username.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else if (!usersMatch) {
            res.status(401).json({ success: false, message: "Unauthorized access" });
        } else {
            const q = 'DELETE FROM app_user WHERE username = ?';
            const [result, fields] = await pool.execute(q, [username]);
            if (result.affectedRows >= 1) {
                res.status(200).json({ success: true, message: "Deleted user" });
            } else {
                res.status(404).json({ success: false, message: "Did not find user" });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error deleting user" });
    }
};

module.exports = {
    findUser: findUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
};