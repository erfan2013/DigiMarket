const mongoose = require('mongoose');

const addToCart = new mongoose.Schema({
  productId : {
    ref: 'Product',
    type: String,
  },
  quantity : Number,
  userId : String,
},{
    timestamps : true
});

const addToCartModel = mongoose.model('addToCart', addToCart);

module.exports = addToCartModel;