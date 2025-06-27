const express = require('express');
const app = express();
const port = 4000;

const userRoute = require('./routes/user');
const commentRoute = require('./routes/comments');
const login = require('./routes/app');

/*app.use('/user', userRoute);
app.use('/comment', commentRoute)*/

app.use('/',login);

app.listen(port,() => {
    console.log("listening to port 4000");
});