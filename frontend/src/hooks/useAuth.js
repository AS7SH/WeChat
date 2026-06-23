import { API } from "@/lib/axios-client";
import { toast } from "sonner";
import { create } from "zustand";
import { useSocket } from "./useSocket";

export const useAuth = create((set, get) => ({
    user: null,
    isVerified: false,
    isSigningUp: false,
    isLoggingIn: false,
    isAuthStatusLoading: false,
    isVerifyLoading: false,
    isResendEmailLoading: false,
    isResetPassLoading: false,

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await API.post("/auth/signup", data);
            set({ user: response.data.data, isSigningUp: false });
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Registration Failed",
            );
            set({ user: null });
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await API.post("/auth/login", data);
            set({ user: response.data.data, isLoggingIn: false });
            useSocket.getState().connectSocket();
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login Failed");
            set({ user: null });
            throw error;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    verifyEmail: async (code) => {
        set({ isVerifyLoading: true });
        try {
            const response = await API.post("/auth/verify-email", { code });
            set({
                user: response?.data?.data,
                isVerifyLoading: false,
            });
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Email Verification Failed",
            );
            throw error;
        } finally {
            set({ isVerifyLoading: false });
        }
    },

    resendVerificationCode: async () => {
        set({ isResendEmailLoading: true });
        try {
            const response = await API.post("/auth/resend-verification");
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to resend Email",
            );
            throw error;
        } finally {
            set({ isResendEmailLoading: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isResetPassLoading: true });
        try {
            const response = await API.post(`/auth/forgot-password`, { email });
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to send Email",
            );
            throw error;
        } finally {
            set({ isResetPassLoading: false });
        }
    },

    resetPassword: async (email, code, password) => {
        set({ isResetPassLoading: true });
        try {
            const response = await API.post(`/auth/reset-password`, {
                email,
                code,
                password,
            });
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Password Reset Failed",
            );
            throw error;
        } finally {
            set({ isResetPassLoading: false });
        }
    },

    logout: async () => {
        try {
            await API.post("/auth/logout");
            useSocket.getState().disconnectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout Failed");
        } finally {
            set({ user: null });
        }
    },

    isAuthStatus: async () => {
        set({ isAuthStatusLoading: true });
        try {
            const response = await API.get("/auth/status");
            set({ user: response?.data?.data, isAuthStatusLoading: false });
            useSocket.getState().connectSocket();
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isAuthStatusLoading: false });
        }
    },
}));
