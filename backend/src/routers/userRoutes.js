
import express from "express";
import {
  registerUserController,
  verifyOTPController,
  loginUserController,
  resendOtpController,
  googleAuthController,
  forgotPasswordController,
  forgotOtpController,
  resetPasswordController,
//   getUserDetailsController,

} from "../controllers/userController.js";
import {
  otpValidation,
  registerValidation,
  userLoginValidation,
} from "../validations/userValidations.js";

const router = express.Router();

router.post("/register", registerValidation, registerUserController);
router.post("/login", userLoginValidation, loginUserController);
router.post("/register-otp", otpValidation, verifyOTPController);
router.post("/resend-otp", resendOtpController);
router.post("/google-auth", googleAuthController);
router.post("/forgot-password", forgotPasswordController);
router.post("/forgot-otp", forgotOtpController);
router.post("/reset-password", resetPasswordController);
// router.get("/user-details/:userId", getUserDetailsController);

export default router;
