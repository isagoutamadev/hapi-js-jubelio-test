const AuthHelper = require('../../src/helpers/AuthHelper');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE m_users CASCADE");
  await knex('m_users').insert([
    {
      id: 1,
      username: 'admin001',
      password: AuthHelper.hash("admin123"),
      role: 'admin'
    },
    {
      id: 2,
      username: 'customer001',
      password: AuthHelper.hash("customer001"),
      role: 'customer'
    },
    {
      id: 3,
      username: 'customer002',
      password: AuthHelper.hash("customer002"),
      role: 'customer'
    },
  ]);
};
