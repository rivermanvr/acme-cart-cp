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

// .....class methods.....

Product.names = function (id) {
  return this.findById(id)
    .then(product => {
      return product.name;
    })
}

module.exports = Product;
