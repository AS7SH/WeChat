import { useState } from "react";
import { useAuthStore } from "../../store/authStore.jsx";
import { useNavigate } from "react-router-dom";
import { Loader, HelpCircle } from "lucide-react";
import { toast } from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/;

    const canSubmit = passwordRegex.test(formData.password);

    const { signup, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        if (!canSubmit) {
            e.preventDefault();
            return;
        }

        e.preventDefault();

        try {
            const response = await signup(
                formData.username,
                formData.name,
                formData.email,
                formData.password,
            );
            toast.success(response.message);
            navigate("/auth/verify-email");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <>
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
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
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
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
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
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-text"
                            >
                                Password
                            </label>

                            {/* Question Mark Icon with Tooltip */}
                            <div className="group relative flex items-center">
                                <HelpCircle className="size-4 cursor-help text-text-muted transition-colors hover:text-text" />

                                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 rounded-xl border border-border bg-bg-light p-3 shadow-lg group-hover:block">
                                    <p className="mb-2 text-xs text-text-muted">
                                        Password requirements:
                                    </p>

                                    <ul className="space-y-1 text-xs">
                                        <li
                                            className={
                                                formData.password.length >= 8
                                                    ? "text-green-500"
                                                    : "text-text-muted"
                                            }
                                        >
                                            ✓ At least 8 characters
                                        </li>

                                        <li
                                            className={
                                                /[A-Z]/.test(formData.password)
                                                    ? "text-green-500"
                                                    : "text-text-muted"
                                            }
                                        >
                                            ✓ One uppercase letter
                                        </li>

                                        <li
                                            className={
                                                /[a-z]/.test(formData.password)
                                                    ? "text-green-500"
                                                    : "text-text-muted"
                                            }
                                        >
                                            ✓ One lowercase letter
                                        </li>

                                        <li
                                            className={
                                                /\d/.test(formData.password)
                                                    ? "text-green-500"
                                                    : "text-text-muted"
                                            }
                                        >
                                            ✓ One number
                                        </li>

                                        <li
                                            className={
                                                /[@$!%*?&_#]/.test(
                                                    formData.password,
                                                )
                                                    ? "text-green-500"
                                                    : "text-text-muted"
                                            }
                                        >
                                            ✓ One special character
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                            placeholder="Create a password"
                            className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                        />
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            aria-disabled={!canSubmit}
                            onClick={handleSubmit}
                            className={`mt-2 h-12 w-full rounded-full font-medium text-white transition-opacity ${
                                canSubmit
                                    ? "bg-primary hover:opacity-90"
                                    : "cursor-not-allowed bg-gray-500 opacity-60"
                            }`}
                        >
                            {isLoading ? (
                                <Loader className="mx-auto size-8 animate-spin" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-border pt-5 text-center">
                    <p className="text-sm text-text-muted">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/auth/login")}
                            className="font-medium cursor-pointer text-primary "
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
