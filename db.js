const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pr@nju', // Your MySQL password
  database: 'financial_system',
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

module.exports = db;
