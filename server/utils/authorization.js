const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const authorizationMiddleware = (req, res, next) => {
    if (req.headers.authorization && typeof req.headers.authorization === 'string') {
        const auth = req.headers.authorization.split(' ');
        if (auth && auth.length > 1) {
            const token = auth[1];
            try {
                const validToken = jwt.verify(token, process.env.AUTH_SECRET);
                next();
            } catch (err) {
                res.status(401).json({ success: false, message: "Unauthorized access" });
            };
        }
    }
};

const generateToken = (username) => {
    const payload = { sub: username };
    const token = jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '1h' });
    return token;
};

const checkUsername = (req, username) => {
    const token = req.headers.authorization.split(' ')[1];
    const validToken = jwt.verify(token, process.env.AUTH_SECRET);
    return validToken.payload.sub === username;
};

module.exports = {
    authorizationMiddleware: authorizationMiddleware,
    generateToken: generateToken,
    checkUsername: checkUsername,
}