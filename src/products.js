const pool = require('./db');

/**
 * Возвращает список всех товаров вместе с названиями категорий.
 * @returns {Promise<Array<{id: number, name: string, price: string, category: string}>>}
 *   Массив товаров.
 */
async function getProducts() {
  const [rows] = await pool.query(
    'SELECT p.id, p.name, p.price, c.name AS category ' +
    'FROM products p JOIN categories c ON c.id = p.category_id'
  );
  return rows;
}

/**
 * Возвращает товар по идентификатору.
 * @param {number} id Идентификатор товара (целое число).
 * @returns {Promise<{id: number, name: string, price: string}|undefined>}
 *   Товар или undefined, если он не найден.
 */
async function getProductById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, price FROM products WHERE id = ?', [id]
  );
  return rows[0];
}

module.exports = { getProducts, getProductById };
