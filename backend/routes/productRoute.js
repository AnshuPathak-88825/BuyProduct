const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth");
const {getAllProducts,createProduct,updateProduct,deleteProduct,GetProductDetail} =require("../controllers/productController")
router.route("/products").get(authorizeRoles("admin"),getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.route("/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.route("/products/:id").get(GetProductDetail);



module.exports = router;
