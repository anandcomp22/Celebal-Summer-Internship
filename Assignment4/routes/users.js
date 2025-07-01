const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

let users = [
  { id: 1, name: 'Anand' },
  { id: 2, name: 'Jay' }
];

router.post('/', authMiddleware, (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get('/', authMiddleware, (req, res) => {
  res.json(users);
});

router.get('/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

router.put('/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;