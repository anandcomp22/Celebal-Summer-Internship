const mysql = require('mysql2/promise');
require("dotenv").config();

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: process.env.PASSWORD,
    database: 'employee_db'
})

module.exports = mysqlPool;
