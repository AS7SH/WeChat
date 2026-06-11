import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import ForgotPassword from "../components/Auth/ForgotPassword";
import EmailVerification from "../components/Auth/EmailVerification";
import App from "../App";
import PageNotFound from "../components/PageNotFound";
import { useAuthStore } from "../store/authStore";

//redirect authenticated users to home page
const GuestRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user?.isVerified) {
        return <Navigate to={"/"} replace />;
    }

    if (isAuthenticated && !user?.isVerified) {
        return <Navigate to={"/auth/verify-email"} replace />;
    }

    return children;
};

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to={"/auth/login"} replace />;
    }

    if (!user?.isVerified) {
        return <Navigate to={"/auth/verify-email"} replace />;
    }

    return children;
};

const UnverifiedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (user?.isVerified) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const ForgotPasswordRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to={"/"} replace />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
    },
    {
        path: "/auth",
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: (
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        ),
                    },
                    {
                        path: "signup",
                        element: (
                            <GuestRoute>
                                <Signup />
                            </GuestRoute>
                        ),
                    },
                    {
                        path: "forgot-password",
                        element: (
                            <ForgotPasswordRoute>
                                <ForgotPassword />
                            </ForgotPasswordRoute>
                        ),
                    },
                    {
                        path: "verify-email",
                        element: (
                            <UnverifiedRoute>
                                <EmailVerification />
                            </UnverifiedRoute>
                        ),
                    },
                ],
            },
        ],
    },
    { path: "*", element: <PageNotFound /> },
]);

export default router;
