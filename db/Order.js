const db = require( './db' );

const defineAttr = {
  isCart: {
    type: db.Sequelize.BOOLEAN
  },
  address: {
    type: db.Sequelize.STRING
  }
};

const defineOptions = {};

const Order = db.define('order', defineAttr, defineOptions);

// .....class methods.....

Order.buildCart = function () {
  return this.findOne({
    where: { isCart: true }
  })
  .then(cart => {
    if (!cart) {
      cart = this.build({ isCart: true });
    }
    return cart.save();
  })
  .then(cart => {
    return cart;
  })
}

module.exports = Order;
