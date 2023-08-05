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
  const token=await user.getJWTToken();

  res.status(201).json({ status: true, token });
});
