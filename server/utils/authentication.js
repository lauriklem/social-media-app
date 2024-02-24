const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticationMiddleware = (req, res, next) => {
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

module.exports = authenticationMiddleware;