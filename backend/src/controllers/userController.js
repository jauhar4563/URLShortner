
import asyncHandler from "express-async-handler";
import speakeasy from "speakeasy";
import bcrypt from "bcryptjs";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";
import sendVerifyMail from "../utils/sendVerifyMail.js";


// @desc    Register new User
// @route   USER /register
// @access  Public

export const registerUserController = asyncHandler(
  async (req, res) => {
    const { name, email, password } = req.body;

    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret({ length: 20 }).base32,
      digits: 4,
    });
    const sessionData = req.session;
    sessionData.userDetails = { name, email, password };
    sessionData.otp = otp;
    sessionData.otpGeneratedTime = Date.now();
    console.log(sessionData.otp);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    sessionData.userDetails.password = hashedPassword;
    sendVerifyMail(req, name, email);

    res.status(200).json({ message: "OTP sent for verification", email });
  }
);

// @desc    Register OTP Verification
// @route   USER /register-otp
// @access  Public

export const verifyOTPController = asyncHandler(
  async (req, res) => {
    const { otp } = req.body;

    console.log(req.session);
    const sessionData = req.session;

    const storedOTP = sessionData.otp;
    console.log(storedOTP);
    if (!storedOTP || otp !== storedOTP) {
      res.status(400);
      throw new Error("Invalid OTP");
    }
    const otpGeneratedTime = sessionData.otpGeneratedTime || 0;
    const currentTime = Date.now();
    const otpExpirationTime = 60 * 1000;
    if (currentTime - otpGeneratedTime > otpExpirationTime) {
      res.status(400);
      throw new Error("OTP has expired");
    }

    const userDetails = sessionData.userDetails;
    if (!userDetails) {
      res.status(400);
      throw new Error("User details not found in session");
    }
    const user = await User.create({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    });
    await Connections.create({
      userId: user._id,
    });

    delete sessionData.userDetails;
    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;

    res.status(200).json({ message: "OTP verified, user created", user });
  }
);

// @desc    Resend OTP
// @route   USER /resend-otp
// @access  Public

export const resendOtpController = asyncHandler(
  async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret({ length: 20 }).base32,
      digits: 4,
    });

    const sessionData = req.session;
    sessionData.otp = otp;
    sessionData.otpGeneratedTime = Date.now();

    const userDetails = sessionData.userDetails;
    if (!userDetails) {
      res.status(400);
      throw new Error("User details not found in session");
      return;
    }
    console.log(otp);
    sendVerifyMail(req, userDetails.name, userDetails.email);
    res.status(200).json({ message: "OTP sent for verification", email });
  }
);

// @desc    User Login
// @route   USER /login
// @access  Public

export const loginUserController = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: "Login Successful",
        _id: user.id,
        name: user.name,
        email: user.email,
        profileImg: user.profileImg,
        savedPost: user.savedPost,
        bio: user.bio,
        phone: user.phone,
        isPrivate: user.isPrivate,
        isVerified: user.isVerified,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  }
);

// @desc    Google Authentication
// @route   USER /google-auth
// @access  Public

export const googleAuthController = asyncHandler(
  async (req, res) => {
    const { name, email, imageUrl } = req.body;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        if (userExist.isBlocked) {
          res.status(400);
          throw new Error("User is blocked");
        }

        if (userExist.isGoogle) {
          res.json({
            message: "Login Successful",
            _id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            profileImg: userExist.profileImg,
            savedPost: userExist.savedPost,
            bio: userExist.bio,
            phone: userExist.phone,
            isPrivate: userExist.isPrivate,
            isVerified: userExist.isVerified,
            token: generateToken(userExist.id),
          });
          return;
        } else {
          res.status(400);
          throw new Error(
            "User already Exist with that email. Try a differeny email"
          );
        }
      }

      const randomPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = await User.create({
        name: name,
        email,
        password: hashedPassword,
        profileImg: imageUrl,
        isGoogle: true,
      });
      await Connections.create({
        userId: newUser._id,
      });

      const token = generateToken(newUser.id);

      res.status(200).json({
        message: "Login Successful",
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profileImg: newUser.profileImg,
        savedPost: newUser.savedPost,
        bio: newUser.bio,
        phone: newUser.phone,
        isPrivate: newUser.isPrivate,
        isVerified: newUser.isVerified,

        token: token,
      });
    } catch (error) {
      console.error("Error in Google authentication:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @desc    Forgot Password
// @route   USER /forgot-password
// @access  Public

export const forgotPasswordController = asyncHandler(
  async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    if (user) {
      const otp = speakeasy.totp({
        secret: speakeasy.generateSecret({ length: 20 }).base32,
        digits: 4,
      });

      const sessionData = req.session;
      sessionData.otp = otp;
      sessionData.otpGeneratedTime = Date.now();
      sessionData.email = email;
      sendVerifyMail(req, user.name, user.email);
      console.log(otp);
      res
        .status(200)
        .json({ message: `OTP has been send to your email`, email });
    } else {
      res.status(400);
      throw new Error("Not User Found");
    }
  }
);

// @desc    Forgot Password OTP verification
// @route   USER /forgot-otp
// @access  Public

export const forgotOtpController = asyncHandler(
  async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
      res.status(400);
      throw new Error("Please provide OTP");
    }
    const sessionData = req.session;

    const storedOTP = sessionData.otp;
    console.log(storedOTP);
    if (!storedOTP || otp !== storedOTP) {
      res.status(400);
      throw new Error("Invalid OTP");
    }
    const otpGeneratedTime = sessionData.otpGeneratedTime || 0;
    const currentTime = Date.now();
    const otpExpirationTime = 60 * 1000;
    if (currentTime - otpGeneratedTime > otpExpirationTime) {
      res.status(400);
      throw new Error("OTP has expired");
    }

    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;

    res.status(200).json({
      message: "OTP has been verified. Please reset password",
      email: sessionData?.email,
    });
  }
);

// @desc    Reset-Password
// @route   USER /reset-passwordt
// @access  Public

export const resetPasswordController = asyncHandler(
  async (req, res) => {
    const { password, confirmPassword } = req.body;
    const sessionData = req.session;

    if (!sessionData || !sessionData.email) {
      res.status(400);
      throw new Error("No session data found");
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Password do not match");
    }

    const user = await User.findOne({ email: sessionData.email });
    if (!user) {
      res.status(400);
      throw new Error("User Not Found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password has been reset successfully" });
  }
);

