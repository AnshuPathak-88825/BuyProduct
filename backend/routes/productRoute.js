const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
router.route("/products").get(productControllor.getAllProducts);
router.route("/products/new").post(productControllor.createProduct);

module.exports = router;
