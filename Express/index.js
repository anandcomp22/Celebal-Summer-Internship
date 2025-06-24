const express = require('express');
const app = express();
const port = 4000;

const userRoute = require('./routes/user');
const commentRoute = require('./routes/comments');

app.use('/user', userRoute);
app.use('/comment', commentRoute);

app.listen(4000, () => {
    console.log("listening to port 4000");
});