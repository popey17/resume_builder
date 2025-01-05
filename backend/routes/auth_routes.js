import express from "express";
import { registerUser, loginUser, logoutUser, sendVerifyOtp , verifyEmail, isLoggedIn, sendResetOtp, resetPassword } from "../controllers/auth_controller.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/register', registerUser);

authRouter.post('/login', loginUser);

authRouter.post('/logout', logoutUser);

authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);

authRouter.post('/verify-email', userAuth, verifyEmail);

authRouter.get('/is-logged-in', userAuth, isLoggedIn);

authRouter.post('/send-reset-otp', sendResetOtp);

authRouter.post('/reset-password', resetPassword);

export default authRouter;