import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
    const { login, isLoggingIn } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            toast.success(response?.message || "Logged in successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full max-w-md bg-bg-light rounded-3xl border border-border p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-semibold text-text">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-text-muted">
                    Log in to your account to continue
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your username or email"
                        className={`h-12 w-full rounded-xl border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary ${
                            errors.identifier
                                ? "border-red-500"
                                : "border-border"
                        }`}
                        {...register("identifier", {
                            required: "Username or email is required",
                        })}
                    />
                </div>

                {/* Password */}
                <div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`h-12 w-full rounded-xl border bg-transparent px-4 pr-12 text-text outline-none transition-colors focus:border-primary ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-border"
                            }`}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        {/* Show/Hide Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff className="size-5" />
                            ) : (
                                <Eye className="size-5" />
                            )}
                        </button>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mt-2 text-right">
                        <button
                            type="button"
                            onClick={() => navigate("/auth/forgot-password")}
                            className="cursor-pointer font-medium text-primary hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={!isValid || isLoggingIn}
                        className={`mt-2 h-12 w-full rounded-full font-medium text-white transition-opacity ${
                            isValid
                                ? "bg-primary hover:opacity-90"
                                : "cursor-not-allowed bg-gray-500 opacity-60"
                        }`}
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>

            {/* Footer */}
            <div className="mt-6 border-t border-border pt-5 text-center">
                <p className="text-sm text-text-muted">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/auth/signup")}
                        className="cursor-pointer font-medium text-primary hover:underline"
                    >
                        Signup
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
