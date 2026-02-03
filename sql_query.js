const mysql = require('mysql2'); // Better to use const
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("I am Connected!");

  // CREATE TABLE with IF NOT EXISTS
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      surname VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;

  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table created (if it didn't exist)");
  });
});
