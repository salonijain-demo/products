var Query = require('./controller/query');

module.exports = function (app) {
  app.post('/add_products', Query.addProducts);
  app.put('/upload_image_files/:productId', Query.uploadImageFiles);
  app.get('/get_all_products', Query.getAllProducts);
  app.put('/edit_products/:productId', Query.editProducts);
  app.put('/add_cart_products', Query.addCartProducts);
  app.get('/get_specific_products/:productId', Query.getSpecificProduct)
  app.get('/get_cart_products', Query.getCartProducts)
  app.put('/delete_products/:id', Query.deleteProducts)
};