import User from "../models/user_model.js";


export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, userData: user });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });    
  }
}