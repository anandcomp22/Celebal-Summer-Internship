require('dotenv').config()
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())


let refreshTokens = []
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
    if(err) return res.sendStatus(403)
    const accessToken = generateToken({name: user.name})
    res.json({ accessToken: accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshToken = refreshToken.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login',(req,res) => {
    //Authentication User
    const username = req.body.username;
    const user = { name: username }

    const accessToken = generateToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken : accessToken, refreshToken : refreshToken })
})

function generateToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '180s'})
}

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})