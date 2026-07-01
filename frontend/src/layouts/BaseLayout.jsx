import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />

            {/* flex-1 forces this container to fill the remaining height minus the Navbar */}
            <main className="flex-1 flex justify-center items-center p-4">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default BaseLayout;
