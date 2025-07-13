const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token || token !== 'Bearer mysecrettoken') {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    next();
};

module.exports = auth;