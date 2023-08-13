const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

// create an order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

//get Single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (!orders) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

