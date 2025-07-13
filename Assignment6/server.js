const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');

dotenv.config();
const app = express();
app.use(logger);
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('Welcome to the User API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});