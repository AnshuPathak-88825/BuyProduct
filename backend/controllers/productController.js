const Product = require("../model/productModel");
//create product
module.exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: true,
    product,
  });
};
module.exports.getAllProducts = (req, res) => {
  res.status(200).json({ message: "This is working" });
};
