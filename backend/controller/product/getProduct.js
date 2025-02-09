const productModel = require("../../models/ProductModel");

const getProductController = async (req, res) => {
    try {
        // Await the result of the find operation
        const allProduct = await productModel.find().sort({ createdAt: -1 });

        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProduct,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        });
    }
};

module.exports = getProductController;