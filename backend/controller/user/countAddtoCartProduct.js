const addToCartModel = require("../../models/cartProduct");

const countAddTocartProduct = async (req,res)=> {
    try{
        const userId = req.userId;
        const count = await addToCartModel.countDocuments({
            userId:userId
        });
        res.json({
            data: {count : count},
            message: "Count of Add to Cart Product",
            error: false,
            success: true,
        })
    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error : true,
            success: false,
    });
    }
}

module.exports = countAddTocartProduct;