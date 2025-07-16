require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

const posts = [
    {
        username: "john",
        title: "post 2"
    },
    {
        username: "admin",
        title: "post 1"
    }
]
app.get('/posts', authenticationToken,(req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

function authenticationToken(req, res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) {
        res.status(404).send("Can't access user")
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})