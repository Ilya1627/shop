const pool = require('./db');

/**
 * Возвращает список всех заявок вместе с именами клиентов и мастеров.
 * @returns {Promise<Array<{id: number, description: string, status: string, client: string, master: string}>>}
 *   Массив заявок.
 */
async function getRequests() {
  const [rows] = await pool.query(
    'SELECT r.id, r.description, r.status, c.name AS client, m.name AS master ' +
    'FROM requests r ' +
    'JOIN clients c ON c.id = r.client_id ' +
    'LEFT JOIN masters m ON m.id = r.master_id'
  );
  return rows;
}

/**
 * Возвращает заявку по идентификатору.
 * @param {number} id Идентификатор заявки (целое число).
 * @returns {Promise<{id: number, description: string, status: string, price: string}|undefined>}
 *   Заявка или undefined, если она не найдена.
 */
async function getRequestById(id) {
  const [rows] = await pool.query(
    'SELECT id, description, status, price FROM requests WHERE id = ?', [id]
  );
  return rows[0];
}

module.exports = { getRequests, getRequestById };
