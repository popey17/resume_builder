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
          default: null,
        },
        description: {
          type: String,
        },
        stillWorking: {
          type: Boolean,
          default: function () {
            return this.endDate === null;
          },
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
          type: Date,
        },
        endDate: {
          type: Date,
          default: null,
        },
        stillAttending: {
          type: Boolean,
          default: function () {
            return this.endDate === null;
          },
        },
      },
    ],
    certifications: [
      {
        name: {
          type: String,
        },
        issuedBy: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
