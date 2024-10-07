const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or expired token' });
            }

            req.user = user;

            next();
        });
    } else {
        return res.status(401).json({ error: 'Authorization token is missing' });
    }
};

module.exports = authenticateJWT;
