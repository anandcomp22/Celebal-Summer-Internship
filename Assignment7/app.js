require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const userRouter = require('./routes/userRoute')
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(helmet({
  contentSecurityPolicy: false,
  xssFilter: false,
}));

app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  res.removeHeader('X-XSS-Protection');
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'))
})

app.use((_, res) => res.status(404).json({ error: 'Not found' }))
app.use((err, _, res, __) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

mongoose.connect('mongodb://localhost:27017/crud')
  .then(() => console.log('Connected to Database'))
  .catch(err => console.error(err))

app.listen(5000, () => {
  console.log('Server is running on port 5000')
  })
