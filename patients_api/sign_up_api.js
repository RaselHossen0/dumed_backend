// signup.js (or any other API file)
const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'medical_center_db'
});

router.post('/signup', (req, res) => {
   
    // Use the connection for database operations
    connection.query('INSERT INTO users (user_name, role, password, email, gender) VALUES (?, ?, ?, ?, ?)',
        [req.body.user_name, req.body.role, req.body.password, req.body.email, req.body.gender],
        (err, results) => {
            if (err) {
                console.error('Error signing up user: ', err.message);
                res.status(500).send('Error signing up user');
            } else {
                console.log('User signed up successfully');
                res.status(200).send('User signed up successfully');
            }
        });
      
});

module.exports = router;
