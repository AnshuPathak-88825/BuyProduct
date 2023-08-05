const mongoose=require("mongoose");
const validater=require("validator");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Pls Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validater:[validater.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"password should is greater than 8 character"],
        select:false,
    },
    avtar:{
        public_id:{
            type:String,
            required:true        
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user"
    },
    resePasswordToken:String,
    resePasswordExpire:Date,


});
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
    this.password=await bcryptjs.hash(this.password,10);
})
// JWT token 
userSchema.methods.getJWTToken=function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });

}
userSchema.methods.comparePassword=async function(password)
{
    return await bcryptjs.compare(password,this.password);

}
module.exports=mongoose.model("User",userSchema);