const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout,forgotPassword,resetPassword, getUserDetails}=require("../controllers/UserController");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);

module.exports=router;