const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(express.json());

// Connect to SQLite DB (auto-creates file if not found)
const db = new sqlite3.Database('./order.db');

// Create orders table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT,
  items TEXT, -- comma-separated game names or IDs
  total_price REAL,
  order_date TEXT
)`);

// POST /orders - Create new order
app.post('/orders', (req, res) => {
  const { customer_name, items, total_price, order_date } = req.body;
  db.run(
    `INSERT INTO orders (customer_name, items, total_price, order_date) VALUES (?, ?, ?, ?)`,
    [customer_name, items, total_price, order_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// GET /orders - List all orders
app.get('/orders', (req, res) => {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`🛒 Order Service running at http://localhost:${PORT}`);
});
