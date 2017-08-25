const express = require( 'express' );
const app = express();
const path = require( 'path' );
const swig = require( 'swig' );
const bodyParser = require( 'body-parser' );
const routes = require( './routes' );
const methodOverride = require( 'method-override' );
const morgan = require( 'morgan' );

swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/stylesheets', express.static(path.join(__dirname, 'css')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => {
  res.send('Hello');
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

