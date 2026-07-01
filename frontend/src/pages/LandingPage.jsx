import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white flex flex-col">
            {/* Reusable Navbar */}
            <Navbar />

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-dark border border-border-muted text-primary text-sm font-medium mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    WeChat v2.0 is live
                </div>

                <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl">
                    Connect instantly with the{" "}
                    <span className="text-primary">people who matter.</span>
                </h1>

                <p className="text-lg sm:text-xl text-text-muted max-w-2xl mb-10">
                    Fast, secure, and beautiful messaging. WeChat brings your
                    conversations to life across all your devices, seamlessly
                    and safely.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {user ? (
                        <Link
                            to="/chat"
                            className="bg-bg-light hover:bg-bg-dark border border-border text-text text-lg font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center"
                        >
                            Go to Application
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/auth/signup"
                                className="bg-primary text-bg hover:opacity-90 text-lg font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
                            >
                                Start Chatting Now
                            </Link>
                            <Link
                                to="/auth/login"
                                className="bg-bg-light hover:bg-bg-dark border border-border text-text text-lg font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center"
                            >
                                Login to Account
                            </Link>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
