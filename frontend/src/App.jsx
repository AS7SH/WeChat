import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();

    const showNavbar = location.pathname.startsWith("/auth");
    return (
        <main className="min-h-screen bg-bg ">
            {showNavbar && <Navbar />}
            <div className="flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <Routes>
                        <Route path="/" element={"Home"} />
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route
                            path="/auth/forgot-email"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/auth/verify-email"
                            element={<EmailVerification />}
                        />
                    </Routes>
                </div>
            </div>
        </main>
    );
};

export default App;
