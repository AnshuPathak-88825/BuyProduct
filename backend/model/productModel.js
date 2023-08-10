const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,"Please Enter product Name"]
  },
  description:{
    type:String,
    required:[true,"Please Enter product description"]
  },
  price:{
    type:Number,
    required:[true,"Please Enter product price"],
    maxLength:[8,"Price cannot exceed 8 character"]
  }, rating:{
    type:Number,
   default:0

  }, image:{
    public_id:{
        type:String,
        required:true        
    },
    url:{
        type:String,
        required:true
    },    
  },
  category:{
    type:String,
    required:[true,"please Enter product category"]
  },
  stock:{
    type:Number,
    required:true,
    maxLength:[4,"stock cannot exceed 4 character"],
    default:1
  },
  numofReviews:{
    type:Number,
    default:0
  },
  reviews:[
    {
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true, 
  }
  ,
  createAT:{
    type:Date,
    default:Date.now
  }

});
module.exports=mongoose.model("Product",productSchema);