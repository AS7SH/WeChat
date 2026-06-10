import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-bg flex-col items-center justify-center px-6 text-center">
            <h1 className="text-8xl font-bold tracking-tight text-text md:text-9xl">
                404
            </h1>

            <h2 className="mt-4 text-3xl font-semibold text-text">
                Page Not Found
            </h2>

            <p className="mt-3 max-w-md text-text-muted">
                The page you're looking for doesn't exist or may have been
                moved.
            </p>

            <button
                onClick={() => navigate("/")}
                className=" mt-8 h-12 rounded-full bg-primary px-8 font-medium text-white transition-opacity hover:opacity-90 "
            >
                Go to Home
            </button>
        </div>
    );
};

export default PageNotFound;
