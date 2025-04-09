import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  redirectingUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserDetails,
  verifyRefreshToken,
  verifyUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyEmail } from "../middlewares/verifyEmail.middleware.js";

const router = Router();

//user routes
router.route("/register").post(registerUser);
router.route("/user/verify/:id/:token").get(verifyEmail, verifyUser);
router.route("/login").post(loginUser);
router.route("/verify-token").post(verifyRefreshToken);
router.route("/user/forgot-password").post(forgotPassword);
router.route("/user/forgot-password/:id/:token").get(verifyEmail, redirectingUser);
router.route("/user/forgot-password/reset-password").post(resetPassword);

//secured routes
router.route("/user/logout").post(verifyJWT, logoutUser);
router.route("/user/update-profile/password").post(verifyJWT, updatePassword);

export default router;
