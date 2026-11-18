const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello, shop!'));
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/about', (req, res) => res.send('About'));
// This is a comment to create a divergent history
const { version } = require('../package.json');
app.get('/version', (req, res) => res.json({ version }));
app.listen(port, () => console.log(`Server on port ${port}`));
