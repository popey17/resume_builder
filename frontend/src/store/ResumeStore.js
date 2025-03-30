import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";


const backendUrl = "http://localhost:3000/api";


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
        isStillWroking: false,
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
  isLoading: false,
  error: null,

  setResume: (resume) => { 
    set({ resume }) ;
    localStorage.setItem('resume', JSON.stringify(resume));
  },

  saveResume: async (resumeData, navigate, userData) => {
    set({ isLoading: true, error: null });

    if (!userData) {
      toast.error("Please login to continue");
      set({
        isLoading: false,
      });
      if (navigate) {
        navigate("/login");
      }
    } else {
      resumeData.userId = userData._id
    }


    try {
      axios.defaults.withCredentials = true;
      await axios.post(
        `${backendUrl}/resume/create`,
        resumeData
      );

      set({
        error: null,
        isLoading: false,
      });
      
      localStorage.removeItem('resume');
      toast.success("Resume Created Successfully");
      
      if (navigate) {
        navigate("/dashboard");
      }


    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Creating Resume",
        isLoading: false,
      });
      toast.error(error.response?.data?.message || "Error Creating Resume");
    }
    
  },

  getResumeByUser: async (useId) => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/resume/get/${useId}`);
      console.log(data);
      
    }
    catch (error) {
      console.log(error);
    }
  }
}));
