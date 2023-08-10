const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
const {isAuthenticatedUser}=require("../middleware/auth");
const {getAllProducts,createProduct,updateProduct,deleteProduct,GetProductDetail} =require("../controllers/productController")
router.route("/products").get(isAuthenticatedUser,getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,createProduct);
router.route("/products/:id").put(isAuthenticatedUser,updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser,deleteProduct);
router.route("/products/:id").get(GetProductDetail);



module.exports = router;
