const backendDomain = process.env.REACT_APP_BASE_URL || "http://localhost:8080"

const SummaryApi = {
    SignUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"

    },
    signIN : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/userDetails`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : "post"
    },
    ProductDetails : {
        url : `${backendDomain}/api/product-details`,
        method : "post"
    },
    addToCart : {
        url : `${backendDomain}/api/addtocart`,
        method : "post"
    },
    countAddToCart : {
        url : `${backendDomain}/api/countaddtocart`,
        method : "get"
    },
    addToCartViewProduct : {
        url : `${backendDomain}/api/view-all-product`,
        method : "get"
    },
    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : "post"
    },
    deleteAddToCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/api/search-product`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/api/filter-Product`,
        method : "post"
    },
    payment : {
        url : `${backendDomain}/api/checkout`,
        method : "post"
    },
    me: {
        url: `${backendDomain}/api/me`,
        method: "get"
    },
    updateMe: {
        url: `${backendDomain}/api/me`,
        method: "PATCH"
    },
    changePassword: {
        url: `${backendDomain}/api/change-password`,
        method: "PATCH"
    },
    updateAvatar: {
        url: `${backendDomain}/api/me/avatar`,
        method: "PATCH"
    },
    forgotPassword: {
        url: `${backendDomain}/api/auth/forgot-password`,
        method: "POST"
    },
    resetPassword: {
        url: `${backendDomain}/api/auth/reset-password`,
        method: "POST"
    }
}

export default SummaryApi