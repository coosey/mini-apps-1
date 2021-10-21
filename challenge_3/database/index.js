// set up db connection then connect
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'checkout'
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected to database');
    }
});

module.exports = connection;