function loginMiddleware(req, res, next) {
  const name = req.query.name;
  const password = req.query.password;

  if(name == 'Anand' && password == 12345678) {
    console.log(name,password);
    next();
  } else {
    res.send('Cannot Authenticate the user')
  }
}

module.exports = loginMiddleware;
