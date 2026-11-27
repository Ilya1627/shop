const express = require('express');

const app = express();

const port = process.env.PORT || 4000;
const pool = require('./db');

// Маршрут для получения всех заявок
app.get('/requests', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT r.id, r.description, r.status, c.name AS client, m.name AS master ' +
      'FROM requests r ' +
      'JOIN clients c ON c.id = r.client_id ' +
      'LEFT JOIN masters m ON m.id = r.master_id'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Маршрут для получения одной заявки по ID
app.get('/requests/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT id, description, status, price FROM requests WHERE id = ?', [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
app.get('/', (req, res) => res.send('Hello, shop!'));
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/about', (req, res) => res.send('About'));
// This is a comment to create a divergent history
const { version } = require('../package.json');
app.get('/version', (req, res) => res.json({ version }));
app.listen(port, () => console.log(`Server on port ${port}`));
// This is a change on main for rebase
