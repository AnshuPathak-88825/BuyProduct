const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require("jsonwebtoken");
const User=require("../model/userModel")
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
    {
        return next(new Errorhandler("Please to login to access",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData._id); 
    next();

});