import { ForgotPassword, SignIn, SignUp, VerifyEmail } from "@/pages/auth";
import Chat from "@/pages/chat";
import SingleChat from "@/pages/chat/chatId";

export const AUTH_ROUTES = {
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/signup",
    VERIFY_EMAIL: "/auth/verify-email",
    FORGOT_PASSWORD: "/auth/forgot-password",
};

export const PROTECTED_ROUTES = {
    CHAT: "/chat",
    SINGLE_CHAT: "/chat/:chatId",
};

export const authRoutePaths = [
    {
        path: AUTH_ROUTES.SIGN_IN,
        element: <SignIn />,
    },
    {
        path: AUTH_ROUTES.SIGN_UP,
        element: <SignUp />,
    },
    {
        path: AUTH_ROUTES.VERIFY_EMAIL,
        element: <VerifyEmail />,
    },
    {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
    },
];

export const protectedRoutePaths = [
    {
        path: PROTECTED_ROUTES.CHAT,
        element: <Chat />,
    },
    {
        path: PROTECTED_ROUTES.SINGLE_CHAT,
        element: <SingleChat />,
    },
];

export const isAuthRoutes = (pathname) => {
    return Object.values(AUTH_ROUTES).includes(pathname);
};
