const AppWrapper = ({ children }) => {
    return (
        <div className="h-full">
            {/* Toolbar */}
            <main>{children}</main>
        </div>
    );
};

export default AppWrapper;
