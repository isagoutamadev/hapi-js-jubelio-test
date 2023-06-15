const Knex = require('knex');
require('dotenv').config();

const config = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/database/migrations',
    },
    seeds: {
        directory: __dirname + '/database/seeds',
    },
};

module.exports = Knex(config);

