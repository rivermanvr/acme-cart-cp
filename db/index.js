const db = require( './db' );
const Product = require( './Product' );
const Order = require( './Order' );
const LineItem = require( './LineItem' );

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Order.hasMany(LineItem, { foreignKey: 'orderId' });

const sync = () => db.sync({ force: true });

const seed = () => {
  return sync()
    .then(() => {
      const promiseArr = [
        Product.create({ name: 'PRS 513' }),
        Product.create({ name: 'Redgate #347 Cedar' }),
        Product.create({ name: 'Gibson ES175-D Mahogany' })
      ]
      return Promise.all(promiseArr);
    }
  )
};

module.exports = {seed, sync, models: { Product, Order, LineItem } };
