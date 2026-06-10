const Signup = () => {
    return (
        <div className="w-full rounded-3xl border border-border bg-bg-light p-6">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-semibold text-text">
                    Create Account
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    Join and start using the application
                </p>
            </div>

            {/* Form */}
            <form className="space-y-4">
                {/* Username */}
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                    />
                </div>

                {/* Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Full Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-text"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-text"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="
                        mt-2
                        h-12
                        w-full
                        rounded-full
                        bg-primary
                        font-medium
                        text-white
                        transition-opacity
                        hover:opacity-90
                    "
                >
                    Create Account
                </button>
            </form>

            {/* Footer */}
            <div className="mt-6 border-t border-border pt-5 text-center">
                <p className="text-sm text-text-muted">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
