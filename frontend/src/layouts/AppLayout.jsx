import AppWrapper from "@/components/app/AppWrapper";
import ChatList from "@/components/chat/ChatList";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <AppWrapper>
            <div className="h-full">
                <div className="block">
                    <ChatList />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </AppWrapper>
    );
};

export default AppLayout;
