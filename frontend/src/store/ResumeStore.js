import axios from "axios";
import { create } from "zustand";

const backendUrl = "http://localhost:3000/api";

export const useResumeStore = create((set) => ({
  resume : {
    resumeTitle: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    objective: '',
    skills: [],
    socials: [],
    experience: [
      {
        companyName: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    educationDetails: [],
  },

  setResume: (resume) => set({ resume }),


}));
