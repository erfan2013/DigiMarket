const productModel = require("../../models/ProductModel");
const uploadProductPermisson = require("../../helpers/Permisson")

async function updateProductController(req, res) {
    try {

        if(!uploadProductPermisson(req.userId)){
            throw new Error("You are not authorized to upload product")
        }
        const { _id , ...resBody } = req.body;
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);
        
        res.status(200).json({
            message: "Product updated successfully",
            data: updateProduct,
            error: false,
            success: true,
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
            
        })
    }
}
module.exports = updateProductController;