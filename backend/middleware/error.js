const errorhandler = require("../utils/errorhandler");
module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "internal server error";
  if(error.name==="CastError")
  {
    const message=`Resource not found. ${error.path}`;
    return res.status(error.statusCode).json({ success: false, message: message });
  }
  //mongoose duplicate key error
  if(error.code===11000)
  {

    const message=`Duplicate ${Object.keys(error.keyValue)} entered`
    error=new errorhandler(message,400);
  }
  res.status(error.statusCode).json({ success: false, message: error.message });
};
