const pool = require('./connection.js');

async function findUser(req, res) {
    try {
        const username = req.params.username;
        if (username === "") {
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
        if (!username || !password) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = 'INSERT INTO app_user(username, pwd) VALUES (?, ?)';
            const [result, fields] = await pool.execute(q, [username, password]);
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

async function updateUser(req, res) {
    try {
        const oldUsername = req.body.oldUsername;
        const newUsername = req.body.newUsername;
        const newPassword = req.body.newPassword;

        if (!(oldUsername && (newUsername || newPassword))) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            // If password is given, update it
            if (newPassword) {
                const q = 'UPDATE app_user SET pwd = ? WHERE username = ?';
                const [result, fields] = await pool.execute(q, [newPassword, oldUsername]);
                if (result.affectedRows === 1) {
                    res.status(200).json({ success: true, message: "User updated successfully" });
                } else {
                    res.status(500).json({ success: false, message: "Error updating user" });
                }
            } else {
                const q = 'UPDATE app_user SET username = ? WHERE username = ?';
                const [result, fields] = await pool.execute(q, [newUsername, oldUsername]);
                if (result.affectedRows === 1) {
                    res.status(200).json({ success: true, message: "User updated successfully" });
                } else {
                    res.status(500).json({ success: false, message: "Error updating user" });
                }
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error updating user" });
    }
};

module.exports = {
    findUser: findUser,
    addUser: addUser,
    updateUser: updateUser,
};