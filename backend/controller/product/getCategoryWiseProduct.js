const productModel = require("../../models/ProductModel");



const getCategoryWiseProduct = async (req,res) => {
       try{
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category });


        res.json({
            data : product,
            error : false,
            succes : true,
            message : "Product by category"
        })
       }catch(err){
            res.status(400).json({
            message: err.message || err,
            error : true,
            succes : false
            })
       }
}


module.exports = getCategoryWiseProduct;