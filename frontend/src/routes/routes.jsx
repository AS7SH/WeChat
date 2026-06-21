import { SignIn, SignUp } from "@/pages/auth";
import Chat from "@/pages/chat";
import SingleChat from "@/pages/chat/chatId";

export const AUTH_ROUTES = {
    SIGN_IN: "/",
    SIGN_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
    CHAT: "/chat",
    SINGLE_CHAT: "/chat:chatId",
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
];

export const protectedRoutePaths = [
    {
        path: AUTH_ROUTES.CHAT,
        element: <Chat />,
    },
    {
        path: AUTH_ROUTES.SINGLE_CHAT,
        element: <SingleChat />,
    },
];

export const isAuthRoutes = (pathname) => {
    return Object.values(AUTH_ROUTES).includes(pathname);
};
