const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection (⚠️ Render won’t have localhost MySQL — you’ll need external DB later)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'bakerydb'
});

// Route: Register a user
app.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],   // ⚠️ removed phone here, since query has 3 placeholders
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error registering user');
      } else {
        res.send('User registered successfully!');
      }
    }
  );
});

// Route: Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
});

// Root route (homepage)
app.get('/', (req, res) => {
  res.send('Hello, Sweet Tooth!!! Backend is live!');
});

// Login route
app.post('/login', (req, res) => {
  const { email, name, password } = req.body;  // ⚠️ fixed destructuring

  db.query(
    'SELECT * FROM users WHERE (email = ? OR name = ?) AND password = ?',
    [email, name, password],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error logging in');
      } else if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.status(401).send('Invalid login');
      }
    }
  );
});

// Start server (Render needs process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
