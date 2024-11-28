
const jwt = require ('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({ message: 'No token, authorization denied'});
    }
    try {

    } catch(err) {
        res.status(401).json({ message: 'Token is not valid'});
    }
};

module.exports = authMiddleware;