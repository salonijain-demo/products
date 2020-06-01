var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var ProductSchema =new Schema({
  productId: {
    type: String
  },
  title: {
    type: String
  },
  price: {
    type: String
  },
  discount: {
    type: String
  },
  size: {
    type: String
  },
  image: {
    data: Buffer, contentType: String
  }
});

Product = mongoose.model('Product', ProductSchema, 'product');

var CartSchema =new Schema({
  cartId: {
    type: String
  },
  cart: {
    type: Array
  }
})

Cart = mongoose.model('Cart', CartSchema, 'cart');

module.exports = {
  Product: Product,
  Cart: Cart
}
