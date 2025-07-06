const express = require('express');
const app = express();

const db  = require('./db');
const employeeRoutes = require('./controllers/employee_controller');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api/employees', employeeRoutes);

app.use((err,req,res,next) => {
    console.log(err)
    res.status(err.status || 500).send('Something went wrong')
})


db.query("SELECT 1")
    .then(() => {
        console.log('db connteced successfully')
        app.listen(3000, () => console.log('Server started at 3000'))
    })
    .catch(err => console.log('db connection failed. \n' + err))