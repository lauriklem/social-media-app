const pool = require('./connection.js');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password || username.length === 0 || password.length === 0) {
            res.status(400).json({ success: false, message: "Check input" });
        } else {
            const q = 'SELECT username, pwd FROM app_user WHERE username = ?';
            const [result, fields] = await pool.execute(q, [username]);
            if (result[0]) { 
                const hashedpw = result[0].pwd;
                const match = await bcrypt.compare(password, hashedpw);
                if (match) {
                    res.status(200).json({ success: true, message: "Login successful" });
                } else {
                    res.status(401).json({ success: false, message: "Wrong username or password" });
                }
            }
            else {
                res.status(401).json({ success: false, message: "Wrong username or password" });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Error logging in" });
    }
}

module.exports = {
    loginUser: loginUser,
};