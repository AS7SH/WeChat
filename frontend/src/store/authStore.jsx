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
    resMessage: null,

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
                user: response?.data?.data,
                isAuthenticated: true,
                isLoading: false,
                resMessage: response?.data?.message,
            });

            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "error signing up",
                isLoading: false,
            });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URI}/verify-email`, {
                code,
            });

            set({
                user: response?.data?.data,
                isAuthenticated: true,
                isLoading: false,
                resMessage: response?.data?.message,
            });

            return response.data;
        } catch (error) {
            set({
                error:
                    error?.response?.data?.message || "Error verifying Email",
                isLoading: false,
            });
            throw error;
        }
    },

    resendVerificationCode: async () => {
        set({ error: null, isLoading: true });
        try {
            const response = await axios.post(`${API_URI}/resend-verification`);
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            set({
                error:
                    error?.response?.data?.message ||
                    "Error resendign verification mail",
                isLoading: false,
            });
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URI}/check-auth`);

            console.log(response);

            set({
                user: response?.data?.data,
                isAuthenticated: true,
                isCheckingAuth: false,
            });

            return response.data;
        } catch (error) {
            set({
                error: null,
                user: null,
                isAuthenticated: false,
                isCheckingAuth: false,
            });
        }
    },

    login: async (identifier, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/login`, {
                identifier,
                password,
            });

            console.log(response);

            set({
                user: response?.data?.data,
                isAuthenticated: true,
                isLoading: false,
            });

            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error Logging in",
                isLoading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/logout`);
            set({
                isLoading: false,
                isAuthenticated: false,
                error: null,
                user: null,
            });
            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error Logging out",
                isLoading: false,
            });
            throw error;
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/forgot-password`, {
                email,
            });
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error sending email",
                isLoading: false,
            });
            throw error;
        }
    },

    resetPassword: async (email, code, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URI}/reset-password`, {
                email,
                code,
                password,
            });

            set({ isLoading: false });

            return response.data;
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error sending email",
                isLoading: false,
            });
            throw error;
        }
    },
}));
