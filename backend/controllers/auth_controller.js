import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false , message: 'Please fill in all fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if ( !emailRegex.test(email) ) {
    return res.status(400).json({ success: false, message: 'Invalid email' });
  }

  try {
    const userExit = await User.findOne({
      email
    });

    // Check if user already exists
    if (userExit) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save(); // Save user to database

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
      expiresIn: '30d'
    }) // Create token

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }) // Send token as cookie

    // Send Welcome email to user
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to ResuMate',
      text: `Hello ${name},
      welcome to ResuMate.
      We are excited to have you on board.`
    };
    await transporter.sendMail(mailOptions).catch((error) => {
      return res.status(500).json({ success: false, message: error.message });
    });

    return res.status(201).json({ success: true, message: 'User created successfully' });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

export const loginUser = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please fill in all fields' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Password not correct' });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
      expiresIn: '30d'
    }) // Create token

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }) // Send token as cookie

    return res.status(200).json({ success: true, message: 'Login successful' });



  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

export const logoutUser = async (req, res) => {
  
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });
    return res.status(200).json({ success: true, message: 'Logout successful' });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => { 
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already verified' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 2 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Verification OTP',
      text: `Your OTP is ${otp}.
      OTP will expire in 2 hours.`
    };
    await transporter.sendMail(mailOptions)

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!otp || !userId) {
    return res.status(400).json({ success: false, message: 'Missing information' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === '') {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    user.isVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Account Verified',
      text: `Thank you.
      Your account has been verified successfully.`
    }
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Account verified successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
    
  }

};

export const isLoggedIn = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: 'User is logged in' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const sendResetOtp = async (req, res) => {

  const {email} = req.body; 

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please fill in email' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 2 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password OTP',
      text: `Your password reset OTP is ${otp}.
      OTP will expire in 2 hours.`
    };
    await transporter.sendMail(mailOptions)

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  

}

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: 'Missing information' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp !== otp || user.resetOtp === '') {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP expired' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Your password has been reset successfully.`
    }
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Password reset successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

}