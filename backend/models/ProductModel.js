const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ProductName : String,
    BrandName : String,
    category : String,
    ProductImage : [],
    Price : Number,
    Description : String,
    Selling : Number
},{
    timestamps : true
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;