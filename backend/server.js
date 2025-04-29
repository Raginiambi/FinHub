// Backend: Express & MySQL API for Finance Summary
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R@g!n!22', // Ensure this matches your MySQL password
    database: 'finHub_demo'
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database.');
});

// API Route to fetch finance summary
app.get('/api/finance-summary', (req, res) => {
    const query = `
        SELECT category, SUM(amount) AS total_amount
        FROM transactions
        GROUP BY category;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching finance summary:', err);
            res.status(500).json({ error: 'Database query failed' });
            return;
        }
        res.json(results);
    });
});

// Start the Server
app.listen(3000, () => {
    console.log('🚀 Server is running on port 3000');
});
  