import Resume from "../models/resume_model.js";

export const createResume = async (req, res) => {
  const {
    userId,
    name,
    profileImg,
    email,
    phoneNumber,
    address,
    objective,
    skills,
    socials,
    experience,
    educationDetails,
  } = req.body;

  try {
    const resume = new Resume({
      userId,
      name,
      profileImg,
      email,
      phoneNumber,
      address,
      objective,
      skills,
      socials,
      experience,
      educationDetails,
    });

    await resume.save();

    return res
      .status(200)
      .json({ success: true, message: "Resume created successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  const { userId } = req.params;

  try {
    const resume = await Resume.find({ userId });
    return res.status(200).json({ success: true, resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  const { resumeId } = req.params;
  const { userId } = req.body;

  try {
    // Find the resume by ID
    const resume = await Resume.findById(resumeId);

    // Check if user is logged in
    if (!userId) {
      return res.status(400).json({ success: false, message: "Please login first" });
    }

    // Check if the logged-in user is the owner of the resume
    if (resume.userId != userId) {
      return res.status(403).json({
        success: false,
        message: "You must be the owner to delete this resume.",
      });
    }

    // Delete the resume from the database
    await Resume.findOneAndDelete({ _id: resumeId, userId });

    // Respond with a success message
    return res.status(200).json({ success: true, message: "Resume deleted successfully" });

  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(404).json({ success: false, message: "Resume not found" });
  }
};

export const updateResume = async (req, res) => {
  const { resumeId } = req.params;
  const {
    userId,
    name,
    profileImg,
    email,
    phoneNumber,
    address,
    objective,
    skills,
    socials,
    experience,
    educationDetails,
  } = req.body;

  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      {
        userId,
        name,
        profileImg,
        email,
        phoneNumber,
        address,
        objective,
        skills,
        socials,
        experience,
        educationDetails,
      },
      { new: true } 
    );

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




