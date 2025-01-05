import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";



const backendUrl = "http://localhost:3000/api";

export const useAuthStore = create((set) => ({
  user : null,
  isAuthenticated : false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  
  setUser : (user) => set({ user }),

  checkIsAuthenticated : async () => {
    set ({ isCheckingAuth: true, error: null });

    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.get(`${backendUrl}/auth/is-logged-in`);      
      set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
    }
    catch (error) {
      set({ isAuthenticated: false, error: null, isCheckingAuth: false });
    }
  },

  signIn : async ( userCredentials ) => {
    set({ isLoading: true , error: null });

    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendUrl}/auth/login`, userCredentials);

      set ({
        isAuthenticated: true, 
        user: data.user,
        error: null,
        isLoading: false,
      })

    } catch (error) {
      set({error: error.response?.data?.message || "Error Signin", isLoading: false})
      toast.error(error.response?.data?.message || "Error Signin")
    }
    
  },

  register : async ( newUserCredentials ) => {
    set ({ isLoading: true, error: null });

    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendUrl}/auth/register`, newUserCredentials);

      set({
        isAuthenticated: true,
        user: data.user,
        error: null,
        isLoading: false,
      });
    } catch(error) {
      set({error: error.response?.data?.message || "Error Registering", isLoading: false});
      toast.error(error.response?.data?.message || "Error Registering");
    }
  },

  signOut : async () => {
    
    try {
      const res = await axios.post(`${backendUrl}/auth/logout`)
      // console.log(res);
      
      set({
        isAuthenticated: false,
        user: null,
        error: null,
      })
    }catch (error) {
      // set({error})
      console.log(error);
      
    } 
  },

  sendVerifyOtp : async () => {
    set ({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${backendUrl}/auth/send-verify-otp`);
      set({ isLoading: false });
      return res.data;

    } catch (error) {
      set({ error: error.response?.data?.message || "Error sending otp", isLoading: false });
      toast.error(error.response?.data?.message || "Error sending otp");
    }
  },

  verifyOtp : async (otp) => {
    set ( { isLoading: true, error: null });

    try {
      const res = await axios.post(`${backendUrl}/auth/verify-email`, { otp });
      set({ isLoading: false });
      toast.success("Email verified successfully");
      return res.data;
      

    }catch (error) {
      set({ error: error.response?.data?.message || "Error verifying otp", isLoading: false });
      toast.error(error.response?.data?.message || "Error verifying otp");
    }
  }

}));