import AppWrapper from "@/components/AppWrapper";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <AppWrapper>
            <div>
                <Outlet />
            </div>
        </AppWrapper>
    );
};

export default AppLayout;
