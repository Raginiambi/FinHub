const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R@g!n!22',
    database: 'finhub_demo',
});

// Query your transactions
connection.query('SELECT id, DATE_FORMAT(created_at, "%Y-%m-%d") as date, description, amount, type FROM transactions', (err, results) => {
    if (err) {
        console.error('Error querying database:', err);
        connection.end();
        return;
    }

    // Convert JSON to CSV
    const fields = ['id', 'date', 'description', 'amount', 'type'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(results);

    // Write to file
    const filePath = path.join(__dirname, 'transactions_report.csv');
    fs.writeFileSync(filePath, csv);

    console.log(`CSV report generated at ${filePath}`);
    connection.end();
});
