const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute');
const User = require('./models/User');

const app = express();
app.use(express.json({ limit: '10kb' }));
const PORT = 3000;

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/user', userRouter);
app.use(express.static('public'));

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Server error' });
});

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});