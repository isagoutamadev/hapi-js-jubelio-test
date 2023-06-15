const db = require('../utils/DB');

async function getById(id) {
    const query = `
    SELECT id, username, role FROM m_users
    WHERE id = :id AND deleted_at IS NULL
    `;
    const { rows } = await db.raw(query, { id });
    return rows[0];
}

async function getByUsername(username) {
    const query = `
    SELECT id, username, password FROM m_users
    WHERE username = :username AND deleted_at IS NULL
    `;
    const { rows } = await db.raw(query, { username });
    return rows[0];
}

module.exports = {
    getById,
    getByUsername
};
