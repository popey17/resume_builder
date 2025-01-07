import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    profileImg: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    objective: {
      type: String,
    },
    skills: {
      type: [String],
    },
    socials: [
      {
        platform: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    experience: [
      {
        companyName: {
          type: String,
        },
        role: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
          default: null,  // Set default to null if experience is ongoing
        },
        description: {
          type: String,
        },
      },
    ],
    educationDetails: [
      {
        institutionName: {
          type: String,
        },
        degree: {
          type: String,
        },
        startDate: {
          type: Date,  // Changed to Date type
        },
        endDate: {
          type: Date,  // Changed to Date type
        },
      },
    ],
  },
  {
    timestamps: true,  // Enable createdAt and updatedAt
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
