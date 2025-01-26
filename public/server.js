const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "password", // Replace with your MySQL password
  database: "telemed", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

// Routes

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) return res.json({ success: false, message: "Database error." });
    if (results.length > 0) {
      return res.json({ success: false, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(insertUserQuery, [email, hashedPassword], (err) => {
      if (err) return res.json({ success: false, message: "Database error." });
      res.json({ success: true });
    });
  });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const loginQuery = "SELECT * FROM users WHERE email = ?";
  db.query(loginQuery, [email], async (err, results) => {
    if (err) return res.json({ success: false, message: "Database error." });
    if (results.length === 0) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    // Compare hashed passwords
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    res.json({ success: true });
  });
});

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:3000"));
