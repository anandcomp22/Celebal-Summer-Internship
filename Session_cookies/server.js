const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const UserModel = require('./models/User');
const mongoURL = 'mongodb://localhost:27017/sessions';

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

const store = new MongoDBSession({
  uri: mongoURL,
  collection: 'mySessions',
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

function isAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
}


app.get("/", (req, res) => {
  res.render("landing", { session: req.session });
});

app.get("/login", (req, res) => {
  res.render("login", { session: req.session });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  res.redirect("/dashboard");
});

app.get("/register", (req, res) => {
  res.render("register", { session: req.session });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  let user = await UserModel.findOne({ email });
  if (user) {
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user = new UserModel({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
  res.redirect("/login");
});

app.get("/dashboard", isAuth, (req, res) => {
  res.render("dashboard", { session: req.session });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});
