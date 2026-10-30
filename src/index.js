const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello, shop!'));
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/about', (req, res) => res.send('About'));
app.listen(port, () => console.log(`Server on port ${port}`));
