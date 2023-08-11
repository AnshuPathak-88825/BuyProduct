const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const jwtToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto=require("crypto");
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
  jwtToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    jwtToken(user, 201, res);
  })
);

//const user = User.findOne({ email }).select("+password");
//what jwt token
//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged Out",
  });
});

//Forget password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not fount", 404));
  }
  const resettoken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/vi/password/reset/${resettoken}`;
  const message = `your password reset token is is :- \n \n ${resetPasswordUrl} \n\n if you have not required 
  this email then,pleae ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Eccommerce recovery password`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfull`,
    });
  } catch (error) {
    user.resePasswordExpire = undefined;
    user.resePasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({ resetPasswordToken });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  await user.save({ validateBeforeSave: true });

  jwtToken(user, 200, res);
});

//get user details
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  });
});

//update password
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.user._id).select("+password");

  const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
  if(!isPasswordMatched)
  {
    return next(new ErrorHandler("Old password is incorrect",400));
  }
  if(req.body.newPassword!=req.body.confirmPassword){
    return next(new ErrorHandler("password does is not match",400));
  }
  user.password=req.body.newPassword;
  await user.save({ validateBeforeSave: true });
  jwtToken(user,201,res);
});

//update user profile
exports.updateUserProfile=catchAsyncErrors(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
  }
  //  will add cloudinary later
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndyModify:false
  });
  res.status(200).json({
    success:true,
    user
  })
});