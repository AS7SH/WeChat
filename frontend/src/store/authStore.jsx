import axios from "axios";
import { create } from "zustand";

const API_URI = "http://localhost:9870/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (username, name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/signup`, {
                username,
                name,
                email,
                password,
            });

            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error?.response?.data?.message || "error signing up",
                isLoading: false,
            });
            throw error;
        }
    },
}));
