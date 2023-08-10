const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout,forgotPassword}=require("../controllers/UserController");
const {isAuthenticatedUser}=require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgotPassword);

router.route("/logout").get(logout);


module.exports=router;