const Sequelize = require( 'sequelize' );
const connection = process.env.DATABASE_URL || 'postgres://localhost/acme_sql';
const db = new Sequelize(connection, { logging: false });

module.exports = db;
