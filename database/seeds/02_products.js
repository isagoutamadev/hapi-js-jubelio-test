// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

// const api = new WooCommerceRestApi({
//   url: "https://codetesting.jubelio.store/",
//   consumerKey: "cs_7be10f0328c5b1d6a1a3077165b226af71d8b9dc",
//   consumerSecret: "ck_1cbb2c1902d56b629cd9a555cc032c4b478b26ce",
//   version: "wc/v3"
// });
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // try {
  //   const products = await api.get("products", {
  //     per_page: 20, // 20 products per page
  //   });
  //   console.log(products);
  // } catch (error) {
  //   console.error(error.response.data);
  // }

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
