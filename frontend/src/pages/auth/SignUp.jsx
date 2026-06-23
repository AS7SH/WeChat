import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
    const { signup, isSigningUp } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const currentPassword = watch("password", "");
    const passwordRequirements = [
        { label: "At least 8 characters", isMet: currentPassword.length >= 8 },
        { label: "One uppercase letter", isMet: /[A-Z]/.test(currentPassword) },
        { label: "One lowercase letter", isMet: /[a-z]/.test(currentPassword) },
        { label: "One number", isMet: /\d/.test(currentPassword) },
        {
            label: "One special character",
            isMet: /[@$!%*?&_#]/.test(currentPassword),
        },
    ];

    const isPasswordValid = passwordRequirements.every((req) => req.isMet);

    const onSubmit = async (data) => {
        if (!isPasswordValid) {
            toast.error("Please meet all password requirements.");
            return;
        }

        try {
            const response = await signup(data);
            toast.success(response?.message || "Account created!");
            navigate("/auth/verify-email");
        } catch (error) {
            console.log("Component caught error:", error);
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-bg-light p-4">
            {/* Form Container: Added max-w-md to keep it looking good on large screens */}
            <div className="w-full max-w-md rounded-3xl border border-border p-6 shadow-sm">
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
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className={`h-12 w-full rounded-xl border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary ${
                                errors.username
                                    ? "border-red-500"
                                    : "border-border"
                            }`}
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className={`h-12 w-full rounded-xl border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary ${
                                errors.name ? "border-red-500" : "border-border"
                            }`}
                            {...register("name", {
                                required: "Full name is required",
                            })}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`h-12 w-full rounded-xl border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-border"
                            }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                            {...register("password", { required: true })}
                        />

                        {/* Modern Password Toolkit Checklist */}
                        <div className="mt-3 grid grid-cols-2 space-y-2 rounded-xl bg-gray-50/5 p-3 text-xs">
                            {passwordRequirements.map((req, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 transition-colors duration-300 ${
                                        req.isMet
                                            ? "text-green-500"
                                            : "text-text-muted"
                                    }`}
                                >
                                    {req.isMet ? (
                                        <Check className="size-4" />
                                    ) : (
                                        <X className="size-4 opacity-50" />
                                    )}
                                    <span>{req.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={
                                !isValid || !isPasswordValid || isSigningUp
                            }
                            className={`mt-2 h-12 w-full rounded-full font-medium text-white transition-opacity ${
                                isValid && isPasswordValid
                                    ? "bg-primary hover:opacity-90"
                                    : "cursor-not-allowed bg-gray-500 opacity-60"
                            }`}
                        >
                            {isSigningUp ? "Signing up..." : "Create Account"}
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
                            className="font-medium cursor-pointer text-primary hover:underline"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
