const mysql = require('mysql2/promise');

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'455169@nN123',
    database: 'employee_db'
})

mysqlPool.query("SELECT 1")
.then(data => console.log('db connteced successfully'))
.catch(err => console.log('db connection failed. \n' + err))
