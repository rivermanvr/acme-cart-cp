const http = require( 'http' );
const app = require( './app' );
// const db = require( './db' );
const server = http.createServer(app);

let config = process.env;
config = require( './env.json' );
const port = config.PORT || 3000;

// db.seed()
//   .then(() => console.log('seeded'))
//   .then(() => server.listen(port, () => {
//       console.log(`listening on port ${ port }`)
//     }
//   ))
//   .catch(err => console.log(err));

server.listen(port, () => { console.log(`listening on port ${ port }` )})
