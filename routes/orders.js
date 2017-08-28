const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// .....add/create the cart.....

router.post('/:id', (req, res, next) => {
  models.Order.buildCart()
    .then(cart => {
      return models.LineItem.buildLine(req.params.id, cart.id)
    })
    .then(() => {
      res.redirect('/');
    })
})

module.exports = router
