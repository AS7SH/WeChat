import { useState } from "react";
import { useAuthStore } from "../../store/authStore.jsx";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });

    const { login, isLoading } = useAuthStore();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(
                formData.identifier,
                formData.password,
            );
            toast.success(response.message);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "login failed");
        }
    };
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
                        value={formData.identifier}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                identifier: e.target.value,
                            })
                        }
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

                        <Link
                            to={"/auth/forgot-password"}
                            className="text-sm font-medium text-primary"
                            tabIndex={-1}
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <input
                        id="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="Enter your password"
                        className=" h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary "
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className=" h-12 w-full rounded-full cursor-pointer bg-primary font-medium text-white transition-opacity hover:opacity-90 "
                >
                    {isLoading ? (
                        <Loader className="mx-auto size-8 animate-spin" />
                    ) : (
                        "Login"
                    )}
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 border-t border-border pt-6 text-center">
                <p className="text-sm text-text-muted">
                    Don't have an account?{" "}
                    <Link
                        to={"/auth/signup"}
                        className="font-medium text-primary"
                        tabIndex={-1}
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
