const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 4000;

app.use(express.json());

// Connect to SQLite DB
const db = new sqlite3.Database('./games.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  release_date TEXT,
  price REAL
)`);

// POST /games - Add new game
app.post('/games', (req, res) => {
  const { name, category, release_date, price } = req.body;
  db.run(`INSERT INTO games (name, category, release_date, price) VALUES (?, ?, ?, ?)`,
    [name, category, release_date, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
});

// GET /games - List all games
app.get('/games', (req, res) => {
  db.all(`SELECT * FROM games`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Game Service running at http://localhost:${PORT}`);
});
