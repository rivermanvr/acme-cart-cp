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

LineItem.buildLine = function (id, cartId) {
  return this.findOne({
    where: { productId: id }
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

module.exports = LineItem;
