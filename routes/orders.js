const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// .....add to &/or create the cart.....

router.post('/:id/line', (req, res, next) => {
  models.Order.buildCart()
    .then(cart => {
      return models.LineItem.buildLine(req.params.id, cart.id)
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
})

// .....make the order.....

router.put('/:id', (req, res, next) => {
  console.log('............', req.body)
  if (!req.body.address) {
    res.render('index', { error: true });
  } else {
    models.Order.processCart(req.params.id, req.body.address)
      .then(() => {
        res.redirect('/');
      })
  }
})

// .....remove an item from the cart.....
// .....if no lines left, delete the cart.....

router.delete('/:cartId/line/:id', (req, res, next) => {
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
