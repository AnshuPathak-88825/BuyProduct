const express=require("express");
const router=express.Router();
const {GetAllUser,registerUser,loginUser,logout,forgotPassword,resetPassword, getUserDetails,updatePassword,updateUserProfile}=require("../controllers/UserController");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);
router.route("/password/update").get(isAuthenticatedUser,updatePassword);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),GetAllUser);

module.exports=router;