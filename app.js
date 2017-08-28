const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const bodyParser = require( 'body-parser' );
const routes = require( './routes/orders' );
const methodOverride = require( 'method-override' );
const morgan = require( 'morgan' );

const db = require( './db' );
const models = db.models;

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/source', express.static(path.join(__dirname, 'js')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// .....get the data needed for the main route.....

app.use((req, res, next) => {
  let cartNum;
  Promise.all([
    models.Product.findAll({ order: [['id']] }),
    models.Order.findOne({
      where: { isCart: true },
    }),
    models.Order.findAll({
      where: { isCart: false },
      include: [{
        model: models.LineItem,
        include: [models.Product]
      }],
      order: [['id']]
    })
  ])
  .then(([products, cart, orders]) => {
    res.locals.products = products;
    res.locals.orders = orders;
    if (!cart) {
      res.locals.cart = cart;
      next();
    } else {
      cartNum = cart.id;
      res.locals.cartNum = cartNum;
      return models.LineItem.findAll({
        where: { orderId: cart.id },
        include: [{
          model: models.Product
        }],
        order: [['productId']]
      })
      .then(lines => {
        res.locals.cart = lines;
        next();
      })
    }
  })
  .catch(next);
});

app.use('/orders', routes);

app.get('/', (req, res, next) => {
  res.render('index');
})

// ......our error middleware.......

app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { error: err });
});

module.exports = app;
