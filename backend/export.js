const mysql = require('mysql2'); // Import MySQL2
const PDFDocument = require('pdfkit'); // Import PDFKit
const fs = require('fs'); // Import file system module
const path = require('path');

// MySQL Database Connection
const connection = mysql.createConnection({
    host: 'localhost', // Change if using a remote server
    user: 'root',      // Your MySQL username
    password: 'R@g!n!22',      // Your MySQL password (leave empty if no password)
    database: 'finhub_demo',
});

// Query Transactions Table
connection.query('SELECT * FROM transactions', (err, results) => {
    if (err) {
        console.error('Database query error:', err);
        return;
    }

    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, 'transactions_report.pdf'); 
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add Title
    doc.fontSize(18).text('Transactions Report', { align: 'center' });
    doc.moveDown(1);

    // Add Table Header
    const tableTop = 100;
    const idX = 50;
    const dateX = 100;
    const descX = 180;
    const amountX = 400;
    const typeX = 480;

    doc.fontSize(12).text('ID', idX, tableTop)
                   .text('Date', dateX, tableTop)
                   .text('Description', descX, tableTop)
                   .text('Amount', amountX, tableTop)
                   .text('Type', typeX, tableTop);

    // Add Transactions Data
    let y = doc.y + 5; // start just below the headers
    const rowHeight = 20;
    
    results.forEach(row => {
        doc.text(row.id.toString(), idX, y, { width: 40 });
        
        const formattedDate = row.created_at 
            ? new Date(row.created_at).toLocaleDateString('en-GB') 
            : 'N/A';
        doc.text(formattedDate, dateX, y, { width: 70 });
    
        doc.text(row.description, descX, y, { width: 200 });
        doc.text(parseFloat(row.amount).toFixed(2), amountX, y, { width: 60 });
        doc.text(row.type, typeX, y, { width: 50 });
    
        y += rowHeight;
    
        if (y > 720) {
            doc.addPage();
            y = 50;
        }
    });
    
    

    // Finalize the PDF
    doc.end();
    console.log(`PDF generated: ${filePath}`);
    connection.end(); // Close the database connection
});
