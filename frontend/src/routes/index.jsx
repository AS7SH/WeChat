import { Routes, Route } from "react-router-dom";

import { GuestRoute, ProtectedRoute, VerifyEmailRoute } from "./RouteGaurd";
import { ForgotPassword, SignIn, SignUp, VerifyEmail } from "@/pages/auth";

import Chat from "@/pages/chat";
import SingleChat from "@/pages/chat/chatId";
import LandingPage from "@/pages/LandingPage";
import { AppLayout, BaseLayout } from "@/layouts";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<GuestRoute />}>
                <Route element={<BaseLayout />}>
                    <Route path="/auth/login" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>
            </Route>

            <Route element={<VerifyEmailRoute />}>
                <Route element={<BaseLayout />}>
                    <Route
                        path="/auth/verify-email"
                        element={<VerifyEmail />}
                    />
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/:chatId" element={<SingleChat />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
