import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Theme = () => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light",
    );

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme === "light" ? "light" : "dark");
    }, [theme, setTheme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <>
            <div className="p-4">
                <button
                    onClick={toggleTheme}
                    className="text-primary bg-transparent cursor-pointer"
                >
                    {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
        </>
    );
};

export default Theme;
