import { create } from "zustand";
import axiosInstance from "../utils/axios.js";

import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  isCheckingAuth: true,

  // * User Data
  user: null,
  isAuthenticated: false,

  isLoading: false,
  error: null,

  signUp: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/api/auth/signup", data);

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });
      toast.success(response.data.message);
    } catch (error) {
      set({ error: error.message, user: null, isAuthenticated: false });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/api/auth/login", data);

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });
      toast.success(response.data.message);
    } catch (error) {
      set({ error: error.message, user: null, isAuthenticated: false });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/api/auth/logout");

      set({ user: null, isAuthenticated: false, error: null });
      toast.success(response.data.message);
    } catch (error) {
      set({ error: error.message, user: null, isAuthenticated: false });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axiosInstance.get("/api/auth/check-auth");

      set({
        user: response.data.success ? response.data.user : null,
        isAuthenticated: response.data.success,
        error: null,
      });
    } catch (error) {
      set({ error: error.message, user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
