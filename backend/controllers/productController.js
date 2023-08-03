const Product = require("../model/productModel");
const Errorhandler=require("../utils/errorhandler")
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
module.exports.updateProduct = async (req, res,next) => {

    let product = await Product.findById(req.params.id);
    if (!(await product)) {
     
      return next(new Errorhandler("Product not found",404));
      
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ status: true, product });
 
 
};

//Delete product
module.exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      
      return next(new Errorhandler("Product not found",404));

    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: true, message: "product deleted successfully" });
  

};

//Get product Detail
module.exports.GetProductDetail=async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product)
    {
      return next(new Errorhandler("Product not found",404));
    }
    res.status(200).json({
      success:true,
      product
    })

}