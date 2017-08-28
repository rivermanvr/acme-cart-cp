const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// .....add to &/or create the cart.....

router.post('/:id', (req, res, next) => {
  models.Order.buildCart()
    .then(cart => {
      return models.LineItem.buildLine(req.params.id, cart.id)
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
})

// .....remove an item from the cart.....
// .....if no lines left, delete the cart.....

router.delete('/:id/cart/:cartId', (req, res, next) => {
  models.LineItem.removeLine(req.params.id, req.params.cartId)
    .then(() => {
      return models.LineItem.findLines(req.params.cartId)
    })
    .then(lines => {
      if (!lines) return models.Order.removeCart(req.params.cartId);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
})

module.exports = router
