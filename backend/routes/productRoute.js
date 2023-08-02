const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
const {getAllProducts,createProduct,updateProduct,deleteProduct,GetProductDetail} =require("../controllers/productController")
router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/products/:id").put(updateProduct);
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(GetProductDetail);



module.exports = router;
