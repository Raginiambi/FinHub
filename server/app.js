const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

// Get all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM transactions");
    res.json(rows);
  } catch (err) {
    console.error("Error querying database:", err.message);
    res.status(500).send("Database error");
  }
});


// Add a transaction
app.post("/api/transactions", async (req, res) => {
  const { description, amount, type } = req.body;
  await db.query("INSERT INTO transactions (description, amount, type) VALUES (?, ?, ?)", [description, amount, type]);
  res.status(201).send("Transaction added");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);


