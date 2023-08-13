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
    return next(new ErrorHandler("Order not found with this ID ", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders --Admin
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount=0;
  orders.forEach((order)=>{
    totalAmount+=order.totalPrice;
  })
  res.status(200).json({
    success: true,totalAmount,
    orders,
  });
});


//update order status
exports.updateOrder=catchAsyncErrors(async(req,res,next)=>{
  const orders=await Order.findById(req.params.id);
  if(orders.orderStatus=="Delivered")
  {
    return next(new ErrorHandler("you have already delivered this order",400));
  }
  orders.orderItems.forEach(async(order)=>{
    await updateStock(order.productId,order.quantity);
  })
  orders.orderStatus=req.body.status;
  if(req.body.status==="Delivered")
  {
    orders.deliveredAt=Date.now();
  }
  await orders.save({validateBeForSave:true});
  res.status(200).json({
    sucess:true,
  })

})
async function updateStock(id,quantity)
{
  const product=await Product.findById(id);

  product.stock=product.stock-quantity
  await product.save({validateBeforeSave:true});

}

//Delete order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);
  if (!orders) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }
  
  await orders.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ status: true, message: "product deleted successfully" });
});