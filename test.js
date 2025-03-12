const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("Database connected successfully!");
    connection.end();
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();
