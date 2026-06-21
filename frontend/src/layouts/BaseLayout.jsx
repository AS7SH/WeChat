import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <div className="flex flex-col w-full h-auto">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-full h-auto mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default BaseLayout;
