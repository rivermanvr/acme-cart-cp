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

// .....look for the cart or add.....

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

//  .....no products left, delete the cart.....

Order.removeCart = function (id) {
  return this.findById(id)
  .then(cart => {
    return cart.destroy();
  })
}

module.exports = Order;
