const express = require('express');
const app = express();
const path = require('path');
const usersRoutes = require('./routes/users');
const { authToken } = require('./middleware/auth');

const USER = { username: 'admin', password: '1234' };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req,res) => {
    const { username, password } = req.body;
    if(username === USER.username && password === USER.password) {
        res.json({ message: 'Login successful', token: authToken});
    } else {
        res.status(401).json({ message: 'Invalid credentials'});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});