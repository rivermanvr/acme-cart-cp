const db = require( './db' );

const sync = () => db.sync({ force: true });

const seed = () => {
  return sync()
    .then(() => {}
  )
};

module.exports = {seed, sync};
