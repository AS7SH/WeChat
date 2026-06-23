import { useEffect } from "react";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes";
import Logo from "./components/Logo";
import { Spinner } from "./components/ui/spinner";

function App() {
    const { user, isAuthStatus, isAuthStatusLoading } = useAuth();

    useEffect(() => {
        isAuthStatus();
    }, [isAuthStatus]);

    if (isAuthStatusLoading && !user) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Logo imgClass="size-20" showText={false} />
                <Spinner className={"w-6 h-6"} />
            </div>
        );
    }

    return <AppRoutes />;
}

export default App;
