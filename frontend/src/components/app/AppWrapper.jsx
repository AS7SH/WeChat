import AsideBar from "./AsideBar";

const AppWrapper = ({ children }) => {
    return (
        <div className="h-full">
            {/* Toolbar */}
            <AsideBar />
            <main className="lg:pl-10 h-full">{children}</main>
        </div>
    );
};

export default AppWrapper;
