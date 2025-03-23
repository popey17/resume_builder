import { create } from "zustand";

const storedResume = localStorage.getItem("resume")
  ? JSON.parse(localStorage.getItem("resume"))
  : null;

export const useResumeStore = create((set) => ({
  resume : storedResume ||{
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
    educationDetails: [
      {
        institutionName: '',
        degree: '',
        startDate: '',
        endDate: '',
      }
    ],
    certifications: [
      {
        name: '',
        issuedBy: '',
      }
    ]

  },

  setResume: (resume) => { 
    set({ resume }) ;
    localStorage.setItem('resume', JSON.stringify(resume));
  },
}));
