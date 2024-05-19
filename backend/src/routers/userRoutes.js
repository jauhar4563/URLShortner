
import express from "express";
import {
  registerUserController,
  loginUserController,
  googleAuthController,


} from "../controllers/userController.js";
import {

  userLoginValidation,
} from "../validations/userValidations.js";
import { redirectUrlController } from "../controllers/urlController.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", userLoginValidation, loginUserController);
router.post("/google-auth", googleAuthController);
// router.get("/user-details/:userId", getUserDetailsController);

export default router;
