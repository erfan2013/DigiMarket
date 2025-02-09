const uploadProductPermisson = require("../../helpers/Permisson")
const productModel = require("../../models/ProductModel")

async function UploadProductController(req,res) {
    try {

        const sessionUserId = req.userId
        if(!uploadProductPermisson(sessionUserId)){
            throw new Error("You are not authorized to upload product")
        }

        



        const uploadProduct = new productModel(req.body)

        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Product uploaded successfully",
            data: saveProduct,
            error: false,
            success: true
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
    
}

module.exports = UploadProductController;