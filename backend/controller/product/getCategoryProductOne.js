const productModel = require("../../models/ProductModel");


const getCategoryProduct = async (req, res)=> {
    try {

        const productCategory = await productModel.distinct("category");
        console.log(productCategory);

        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.status(200).json({
            message : "product by category",
            data : productByCategory,
            error : false,
            succes : true
        })

    }catch(err){
            res.status(400).json({
            message: err.message || err,
            error : true,
            succes : false
        })
    }
}

module.exports = getCategoryProduct;