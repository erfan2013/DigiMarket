const express = require('express');
const router = express.Router();

const userSigninController = require("../controller/user/userSignin")
const userSignupController = require("../controller/user/userSignup");

const userLogout = require('../controller/user/userLogout');
const authToken = require('../middleware/authToken');
const upload = require('../middleware/upload');
const deleteProductController = require("../controller/product/deleteProduct");
const deleteUser = require('../controller/user/deleteUser');
const allUsers = require('../controller/user/allUsers');
const UploadProductController = require('../controller/product/UploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const userDetailsController = require('../controller/user/userDetails');
const updateUser = require('../controller/user/updateUser');
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails  = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartContoroller');
const countAddTocartProduct = require('../controller/user/countAddtoCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/payment/paymentController');
const { forgotPassword, resetPassword } = require("../controller/auth/passwordController");
const { verifyAll } = require("../utils/email");
const { getMe, updateMe, changePassword ,updateAvatar} = require("../controller/user/meController");
// User Profile Routes
router.get("/me", authToken, getMe);
router.patch("/me", authToken, updateMe);                           // ⭐️ برای ویرایش نام/تلفن/آدرس
router.patch("/me/password", authToken, changePassword);
router.patch("/change-password", authToken, changePassword);
router.patch("/me/avatar", authToken, upload.single("avatar"), updateAvatar);
router.patch("/product/:id", authToken, updateProductController);


router.delete("/user/:id", authToken, deleteUser);
router.delete("/product/:id", authToken, deleteProductController);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

router.get("/email-health", async (req, res) => {
  try {
    const results = await verifyAll();
    const ok = results.every(r => r.ok);
    res.status(ok ? 200 : 500).json({ success: ok, results });
  } catch (e) {
    res.status(500).json({ success:false, message: e.message || "SMTP error" });
  }
});





router.post("/signup",userSignupController)
router.post("/signin",userSigninController)
router.get("/userDetails",authToken ,userDetailsController)
router.get("/userLogout",userLogout)

router.post("/update-product", authToken, updateProductController);

//Admin Panel Routes
router.get("/all-users",authToken,allUsers)
router.post("/update-user",authToken,updateUser)


//product 
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.post("/addtocart",authToken,addToCartController)
router.get("/countaddtocart",authToken,countAddTocartProduct)
router.get("/view-all-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)
router.get("/search-product",searchProduct)
router.post("/filter-Product",filterProductController)

//peyment 

router.post("/checkout",authToken,paymentController)




module.exports = router;