const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
};

const defineOptions = {};

const Product = db.define('product', defineAttr, defineOptions);

module.exports = Product;
