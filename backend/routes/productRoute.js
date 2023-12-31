const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth");
const {DeleteProductReview,getAllProducts,createProduct,updateProduct,deleteProduct,GetProductDetail,createProductReview,GetProductReview} =require("../controllers/productController")
router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.route("/admin/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.route("/products/:id").get(GetProductDetail);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(GetProductReview).delete(DeleteProductReview);
module.exports = router;
