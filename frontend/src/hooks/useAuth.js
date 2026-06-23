import { API } from "@/lib/axios-client";
import { toast } from "sonner";
import { create } from "zustand";
import { useSocket } from "./useSocket";
import AppRoutes from "@/routes";

export const useAuth = create((set, get) => ({
    user: null,
    isVerified: false,
    isSigningUp: false,
    isLoggingIn: false,
    isAuthLoading: false,
    isVerifyLoading: false,
    isResendEmailLoading: false,
    isResetPassLoading: false,

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const response = await API.post("/auth/signup", data);
            set({ user: response.data.data });
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Registration Failed",
            );
            throw error;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true, isVerified: flase });
        try {
            const response = await API.post("/auth/login", data);
            set({ user: response.data.data, isVerified: true });
            useSocket.getState().connectSocket();
            return response?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login Failed");
            throw error;
        } finally {
            set({ isLoggingIn: false, isVerified: false });
        }
    },

    verifyEmail: async (code) => {
        set({ isVerifyLoading: true });

        try {
            const response = await API.post("/auth/verify-email", { code });

            set({ user: response?.data?.data });

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
            set({ isResendEmailLoading: false });
            return response.data;
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to verify Email",
            );
            throw error;
        } finally {
            set({ isResendEmailLoading: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isResetPassLoading: true });
        try {
            const response = await API.post(`/auth/forgot-password`, {
                email,
            });
            set({ isResetPassLoading: false });
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

            set({ isResetPassLoading: false });

            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login Failed");
            throw error;
        } finally {
            set({ isResetPassLoading: false });
        }
    },

    logout: async () => {
        try {
            await API.post("/auth/logout");
            set({ user: null, isVerified: false });
            useSocket.getState().disconnectSocket();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout Failed");
        } finally {
            set({ user: null, isVerified: false });
        }
    },

    isAuthStatus: async () => {
        set({ isAuthLoading: true });
        try {
            const { response } = await API.post("/auth/status");
            set({ user: response?.data?.data });
            useSocket.getState().connectSocket();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Status check Failed",
            );
            console.log(error);
        } finally {
            set({ isAuthLoading: false });
        }
    },
}));
