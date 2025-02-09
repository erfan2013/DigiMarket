const productModel = require("../../models/ProductModel")


const searchProduct = async(req,res) => {
    try{
        const query = req.query.q

        const regex = new RegExp(query, "i","g")

        const product = await productModel.find({
            $or: [
                {ProductName: regex},
                {category: regex}
            ]
        })
        res.json({
            error: false,
            success: true,
            message: "product found",
            data: product
        })



    }catch(err){
        res.json({
            error: true,
            success: false,
            message: err.message
        })
    }
}

module.exports = searchProduct