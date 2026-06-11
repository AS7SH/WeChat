import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import Theme from "./Theme";

const Navbar = () => {
    const { isAuthenticated, logout, error } = useAuthStore();

    const handleLogout = async () => {
        try {
            const response = await logout();
            toast.success(response.message);
        } catch (err) {
            toast.error(error);
        }
    };

    return (
        <nav className="w-full px-6 py-5 mb-5">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight text-text">
                    WeChat
                </h1>
                <div className="flex gap-2">
                    {isAuthenticated && (
                        <button
                            className="rounded-2xl border border-border bg-bg-light px-3 py-2 text-lg font-medium text-text transition-all duration-200 cursor-pointer hover:border-primary hover:bg-primary hover:text-white"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                    <Theme />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
