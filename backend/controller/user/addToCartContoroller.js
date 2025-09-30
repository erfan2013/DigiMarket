const addToCartModel = require("../../models/cartProduct");



const addToCartController = async (req, res) => {
    try {
        const {productId, quantity} = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await addToCartModel.findOne({ productId , userId: currentUser});
        if(isProductAvailable){
            return res.json({
                message: 'Product already added to cart',
                error: true,
                success: false,
            });
        }
        console.log("currentUser",currentUser)

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };
        const newAddtoCart = new addToCartModel(payload);
        const saveProduct = await newAddtoCart.save();
        return res.json({
            data : saveProduct,
            message: 'Product added to cart',
            error: false,
            success: true,
        });
    } catch (err) {
        res.json({
            message: err?.message || err,
            error : true,
            success: false,
    });
    }
}
module.exports = addToCartController;