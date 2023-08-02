const Product = require("../model/productModel");
//create product
module.exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: true,
    product,
  });
};
// get product
module.exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({ status: true, product });
};


//update product
module.exports.updateProduct = async (req, res) => {

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ status: true, product });
  } catch (err) {
    console.error("Error while deleting product:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
 
};

//Delete product
module.exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: true, message: "product deleted successfully" });
  } catch (err) {
    console.error("Error while deleting product:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

};

//Get product Detail
module.exports.GetProductDetail=async(req,res,next)=>{
  try {
    const product=await Product.findById(req.params.id);
    if(!product)
    {
      return res
      .status(404)
      .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ status: true,product });
  } catch (err) {
    console.error("Error while deleting product:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}