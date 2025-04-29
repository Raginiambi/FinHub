const mysql = require('mysql2');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// MySQL Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R@g!n!22',
    database: 'finhub_demo',
    port: 3307,
});

// Query Transactions Table
connection.query('SELECT * FROM transactions', (err, results) => {
    if (err) {
        console.error('Database query error:', err);
        return;
    }

    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = 'transactions_report.pdf';
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add Title
    doc.fontSize(18).text('Transactions Report', { align: 'center' });
    doc.moveDown(1);

    // Add Table Header
    doc.fontSize(12);
    doc.text('ID', 50, doc.y, { width: 50, continued: true })
       .text('Date', 100, doc.y, { width: 100, continued: true })
       .text('Description', 200, doc.y, { width: 150, continued: true })
       .text('Amount', 350, doc.y, { width: 100, continued: true })
       .text('Type', 450, doc.y);
    doc.moveDown(0.5);

    // Draw a line
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.5);

    // Add Transactions Data
    results.forEach(row => {
        doc.text(row.id, 50, doc.y, { width: 50, continued: true })
           .text(row.transaction_date, 100, doc.y, { width: 100, continued: true })
           .text(row.description, 200, doc.y, { width: 150, continued: true })
           .text(row.amount, 350, doc.y, { width: 100, continued: true })
           .text(row.type, 450, doc.y);
        doc.moveDown(0.5);
    });

    // Finalize the PDF
    doc.end();
    console.log(`PDF generated: ${filePath}`);
    connection.end(); // Close the database connection
});
