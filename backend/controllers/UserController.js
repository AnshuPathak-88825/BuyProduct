const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../model/userModel");

//Register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avtar: {
      public_id: "this is sample id",
      url: "profileUrl",
    },
  });
  const token = await user.getJWTToken();
  res.status(201).json({ status: true, token });
});

exports.loginUser = catchAsyncErrors(
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("invalid email or password",401));
    }  
    const isPasswordMatched= await user.getJWTToken();
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password",401));
    }
    const token=user.getJWTToken();
    res.status(200).json({
      success:true,
      token
    })

  })
);

//const user = User.findOne({ email }).select("+password");
//what jwt token