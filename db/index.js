const db = require( './db' );

const sync = () => db.sync({ force: true });

const seed = () => {
  return sync()
    .then(() => {
      //seeding will be here....
    }
  )
};

module.exports = {seed, sync};
