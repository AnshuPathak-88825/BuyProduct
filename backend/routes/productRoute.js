const express = require("express");
const router = express.Router();
const productControllor = require("../controllers/productController");
router.route("/products").get(productControllor.getAllProducts);
module.exports = router;
