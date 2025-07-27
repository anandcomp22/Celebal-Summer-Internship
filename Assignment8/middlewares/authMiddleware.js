const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth && auth === 'Bearer secrettoken') {
    next(); 
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; 

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;
