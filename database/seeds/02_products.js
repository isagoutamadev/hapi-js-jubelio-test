/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE m_products CASCADE");
  const products = [];
  for (let i = 1; i <= 25; i++) {
    products.push({
      id: i,
      name: 'Product ' + i,
      image: '',
      sku: knex.raw(`CONCAT('PRD', LPAD('${i}', 10, '0'))`),
      stock: i * 5,
      price: i * 5000
    });
  }
  await knex('m_products').insert(products);
};
