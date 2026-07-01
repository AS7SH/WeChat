import { useEffect } from "react";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes";
import Logo from "./components/Logo";
import { Spinner } from "./components/ui/spinner";
import { useSocket } from "./hooks/useSocket";

function App() {
    const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
    const { onlineUsers } = useSocket();

    console.log(`onlineUsers: [${onlineUsers}]`);

    useEffect(() => {
        if (user) return;
        isAuthStatus();
    }, [user, isAuthStatus]);

    if (isAuthStatusLoading && !user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Spinner className={"w-10 h-10"} />
            </div>
        );
    }

    return <AppRoutes />;
}

export default App;
