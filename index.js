const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
require('dotenv').config();
const signupRouter = require('./patients_api/sign_up_api');


app.use(express.json());

// Mount the signup router
app.use('/api', signupRouter);
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'medical_center_db'
});
module.exports = connection;
// Connect to the MySQL server
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL server: ', err.message);
    } else {
        console.log('Connected to MySQL server');
    }
});
// Function to create tables
const createTableQueries = [
    `CREATE TABLE IF NOT EXISTS patients (
        health_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT
    );`,
    `CREATE TABLE IF NOT EXISTS medicine (
        medicine_id INT AUTO_INCREMENT PRIMARY KEY,
        expiry_date DATE,
        unit_price DECIMAL(10, 2),
        quantity_available INT,
        name VARCHAR(255),
        description TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        role ENUM('student', 'teacher', 'staff', 'officer'),
        password VARCHAR(255),
        email VARCHAR(255),
        gender ENUM('male', 'female', 'other')
    );`,
    `CREATE TABLE IF NOT EXISTS doctors (
        doctor_id INT AUTO_INCREMENT PRIMARY KEY,
        specialization VARCHAR(255),
        contact_number VARCHAR(20),
        user_id INT
    );`,
    `CREATE TABLE IF NOT EXISTS prescriptions (
        prescription_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        doctor_id INT,
        medicine_id INT,
        quantity_prescribed INT,
        prescription_date DATE,
        symptoms TEXT,
        diagnosis TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS daily_stock (
        medicine_id INT,
        quantity_available INT,
        date DATE,
        PRIMARY KEY (medicine_id, date)
    );`
];

// Execute each table creation query
createTableQueries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if (err) {
            console.error('Error creating tables: ', err.message);
        } else {
            console.log('Table created successfully');
        }
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });