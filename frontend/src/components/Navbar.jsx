import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const handleLogout = async () => {
        try {
            const response = await logout();
            toast.success(response?.message);
        } catch (error) {
            console.log("Error in logging out", error);
        }
    };
    return (
        <nav className="w-full border-b border-border bg-bg-light/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />

                    <div className="flex items-center gap-4 sm:gap-6">
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-0 cursor-pointer rounded-full"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:-rotate-0" />
                        </Button>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <Link
                                    onClick={handleLogout}
                                    className="text-text-muted hover:text-primary font-medium text-sm transition-colors px-2"
                                >
                                    Logout
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/auth/login"
                                        className="text-text-muted hover:text-primary font-medium text-sm transition-colors px-2"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/auth/signup"
                                        className="bg-primary text-bg hover:opacity-90 text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
