import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const GuestRoute = () => {
    const { user } = useAuth();

    if (user?.isVerified) {
        return <Navigate to="/chat" replace />;
    }

    if (user && !user.isVerified) {
        return <Navigate to="/auth/verify-email" replace />;
    }

    return <Outlet />;
};

export const VerifyEmailRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (user.isVerified) {
        return <Navigate to="/chat" replace />;
    }

    return <Outlet />;
};

export const ProtectedRoute = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!user.isVerified) {
        return <Navigate to="/auth/verify-email" replace />;
    }

    return <Outlet />;
};
