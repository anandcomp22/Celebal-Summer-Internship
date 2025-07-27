const express = require('express');
const router = express.Router();

router.get('/secure-data', (req, res) => {
  res.json({ message: 'This is protected content' });
});

module.exports = router;
