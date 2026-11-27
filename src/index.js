const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const app = express();

const port = process.env.PORT || 4000;

// Подключаем функции из нового модуля products.js
const { getRequests, getRequestById } = require('./products');

// Настройка Swagger UI (добавим чуть позже, пока просто заглушка, чтобы не было ошибки)
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Service Center API',
      version: '1.0.0',
      description: 'API для учета заявок',
    },
  },
  apis: [],
};

// Маршрут для получения всех заявок
app.get('/requests', async (req, res) => {
  try {
    res.json(await getRequests());
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
    const request = await getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/', (req, res) => res.send('Hello, shop!'));
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/about', (req, res) => res.send('About'));

const { version } = require('../package.json');
app.get('/version', (req, res) => res.json({ version }));

app.listen(port, () => console.log(`Server on port ${port}`));
