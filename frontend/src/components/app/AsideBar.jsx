import { useAuth } from "@/hooks/useAuth";
import { isUserOnline } from "@/lib/helper";
import { Button } from "../ui/button";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import AvatarWithBadge from "../AvatarWithBadge";
import Logo from "../Logo";

const AsideBar = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const isOnline = isUserOnline(user?._id);

    return (
        <aside className="top-0 fixed inset-y-0 w-15 left-0 z-9999 bg-bg-dark border-r-2 border-border text-text h-svh shadow-sm">
            <div className="w-full h-full px-1 pt-4 py-6 flex flex-col items-center justify-between">
                <Logo
                    imgClass="size-7"
                    textClass="text-white"
                    showText={false}
                />
                <div className="flex flex-col items-center gap-3">
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

                    <Button
                        variant="outline"
                        size="icon"
                        className="border-0 cursor-pointer rounded-full"
                        onClick={logout}
                    >
                        <LogOut className="h-[1.2rem] w-[1.2rem]" />
                    </Button>

                    <div role="button">
                        <AvatarWithBadge
                            name={user?.name || "unknown"}
                            src={user?.avatar}
                            isOnline={isOnline}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AsideBar;
