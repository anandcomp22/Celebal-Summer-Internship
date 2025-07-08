const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscribersRouter = require('./routes/subscribers');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log('Connected to Database');
});

app.use(express.json())
app.use('/subscribers', subscribersRouter);

app.listen(3000, () => {
    console.log('Server running of http//:localhost:3000');
})