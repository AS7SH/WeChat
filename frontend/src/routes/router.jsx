import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import EmailVerification from "../components/EmailVerification";
import App from "../App";
import PageNotFound from "../components/PageNotFound";

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    {
        path: "/auth",
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "signup", element: <Signup /> },
                    { path: "forgot-password", element: <ForgotPassword /> },
                    { path: "verify-email", element: <EmailVerification /> },
                ],
            },
        ],
    },
    { path: "*", element: <PageNotFound /> },
]);

export default router;
