const db = require( './db' );

const defineAttr = {
  quantity: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1
  }
};

const defineOptions = {};

const LineItem = db.define('lineitem', defineAttr, defineOptions);

// .....class methods.....

// .....add or modify a line quantity.....

LineItem.buildLine = function (id, cartId) {
  return this.findOne({
    where: { productId: id, orderId: cartId }
  })
    .then(line => {
      if (line) {
        line.quantity++
      } else {
        line = this.build({
          orderId: cartId,
          productId: id
        });
      }
      return line.save();
    })
    .then(line => {
      return line;
    })
}

// .....remove a line item from the cart.....

LineItem.removeLine = function (id, cartId) {
  return this.findOne({
    where: { productId: id, orderId: cartId }
  })
    .then(line => {
      return line.destroy();
    })
}

//.....after removing line, see if any are left.....

LineItem.findLines = function (cartId) {
  return this.findOne({
    where: { orderId: cartId }
  })
    .then(line => {
      return line;
    })
}

module.exports = LineItem;
