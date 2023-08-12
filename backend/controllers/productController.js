const Product = require("../model/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/Apifeature");
//Create product
module.exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    status: true,
    product,
  });
});
// get all product
module.exports.getAllProducts = catchAsyncError(async (req, res) => {
  const ResultPerpage = 5;
  const totalProducts = await Product.countDocuments({}); // Get total number of products
  const apifeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(ResultPerpage);
  const product = await apifeature.query;
  res.status(200).json({ status: true, product, totalProducts });
});

//update product
module.exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!(await product)) {
    return next(new Errorhandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ status: true, product });
});

//Delete product
module.exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }
  await Product.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ status: true, message: "product deleted successfully" });
});

//Get product Detail
module.exports.GetProductDetail = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new Errorhandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Create new Revieeew or update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
