const mysql = require('mysql2/promise');
require("dotenv").config();

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: process.env.PASSWORD,
    database: 'employee_db'
})

mysqlPool.query("SELECT 1")
.then(data => console.log('db connteced successfully'))
.catch(err => console.log('db connection failed. \n' + err))
