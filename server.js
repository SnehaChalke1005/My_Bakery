const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',   // make sure this matches your MySQL root password
  database: 'bakerydb'
});

// Route: Register a user
app.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, phone, password],
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
  res.send('Welcome to Sneha’s Bakery Backend!');
});

// Login route
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE (email = ? OR name = ?) AND password = ?',
    [email, email, phone, password],
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


// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
