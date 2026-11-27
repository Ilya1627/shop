const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const { getProducts, getProductById } = require('./products');

const app = express();
app.use(express.json());

// Подключение Swagger UI
try {
  const spec = yaml.load(
    fs.readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8')
  );
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
} catch (e) {
  console.error('Ошибка загрузки OpenAPI:', e.message);
}

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/version', (req, res) => res.json({ version: '0.1.0' }));

app.get('/products', async (req, res) => {
  try {
    res.json(await getProducts());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
