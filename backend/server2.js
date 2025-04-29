const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

// Serve all files in the folder (like index.html, css, etc.)
app.use(express.static(__dirname));
// PDF Download Route
app.get('/download-pdf', (req, res) => {
    exec('node export.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('PDF generation failed.');
        }
        const filePath = path.join(__dirname, 'transactions_report.pdf');
        res.download(filePath); // Send the generated PDF to download
    });
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
