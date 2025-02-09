const productModel = require("../../models/ProductModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);


    res.json({
      success: true,
      message: "Product Details",
      data: product,
      error: false,
    }); 

  }catch(err){
    res.json({
        success: false,
        message: err.message || err,
        error: true
        
    })
  }
}

module.exports = getProductDetails;