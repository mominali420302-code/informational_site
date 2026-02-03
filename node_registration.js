const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // public folder serve

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 1️⃣ Create MySQL connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "mydb"
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// Handle Registration Form Submission
app.post('/register', (req, res) => {
    const { firstName, surname, email, password } = req.body;

    // SQL query to insert data
    const sql = "INSERT INTO users (first_name, surname, email, password) VALUES (?, ?, ?, ?)";

    conn.query(sql, [firstName, surname, email, password], (err, result) => {
        if (err) throw err;

        // Send success page
        res.sendFile(path.join(__dirname,'public', 'success.html'));
    });
});

// Handle Login Form Submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // ✅ Define the SQL query properly (SELECT)
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    conn.query(sql, [email, password], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // Login successful
            res.sendFile(path.join(__dirname, 'dashboard.html'));
        } else {
            // Login failed
            res.send(`
                <h2>Invalid Email or Password</h2>
                <a href="/login">Try Again</a>
            `);
        }
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
