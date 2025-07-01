let authToken = 'securetoken123';

function authMiddleware(req,res,next) {
    const token = req.headers['authorization'];
    if(token === authToken) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Invalid token.' });
    }
}

module.exports = { authMiddleware, authToken };