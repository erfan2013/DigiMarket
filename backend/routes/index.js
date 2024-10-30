const express = require('express');
const router = express.Router();
const userSigninController = require("../controller/userSignin")


const userSignupController = require("../controller/userSignup");
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
router.post("/signup",userSignupController)
router.post("/signin",userSigninController)
router.get("/userDetails",authToken ,userDetailsController)

module.exports = router;