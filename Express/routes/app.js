const express = require('express');
const router = express.Router();

const loginMiddleware = require('../middleware/middleware');

router.get('/', (req,res) => {
    res.send("This is Login Page");
})

router.get('/profilePage', loginMiddleware, (req, res) => {
  res.send("This is Profile Page");
});

router.get('/feedPage', (req, res) => {
  res.send("This is Feedback Page");
});

module.exports = router;
