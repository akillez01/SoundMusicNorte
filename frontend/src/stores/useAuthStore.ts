import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        set({ isAdmin: false, error: error.response.data.message });
      } else {
        set({ isAdmin: false, error: "An unexpected error occurred" });
      }
    } finally {
      set({ isLoading: false });
    }
  },
 
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));