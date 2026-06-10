const Login = () => {
    return (
        <div className="w-full rounded-3xl border border-border bg-bg-light p-8 shadow-sm">
            {/* Heading */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-text">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    Sign in to continue to your account
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
                {/* Email / Username */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-text"
                    >
                        Email or Username
                    </label>

                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email or username"
                        className=" h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary "
                    />
                </div>

                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-text"
                        >
                            Password
                        </label>

                        <button
                            type="button"
                            className=" text-sm text-primary hover:underline "
                        >
                            Forgot password?
                        </button>
                    </div>

                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className=" h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary "
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className=" h-12 w-full rounded-full bg-primary font-medium text-white transition-opacity hover:opacity-90 "
                >
                    Login
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 border-t border-border pt-6 text-center">
                <p className="text-sm text-text-muted">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-primary hover:underline"
                    >
                        Create Account
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
