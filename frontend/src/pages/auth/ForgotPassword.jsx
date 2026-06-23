import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth"; // Updated to match your auth hook path
import { toast } from "sonner"; // Using sonner to match SignUp
import { Check, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [password, setPassword] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Updated to use the correct store values based on your useAuth.js
    const { forgotPassword, resetPassword, isResetPassLoading } = useAuth();

    // Fixed the password variable reference (was currentPassword)
    const passwordRequirements = [
        { label: "At least 8 characters", isMet: password.length >= 8 },
        { label: "One uppercase letter", isMet: /[A-Z]/.test(password) },
        { label: "One lowercase letter", isMet: /[a-z]/.test(password) },
        { label: "One number", isMet: /\d/.test(password) },
        {
            label: "One special character",
            isMet: /[@$!%*?&_#]/.test(password),
        },
    ];

    const isPasswordValid = passwordRequirements.every((req) => req.isMet);
    const isOtpComplete = otp.join("").length === 6;
    const canSubmit = isPasswordValid && isOtpComplete;

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        if (digit && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
                return;
            }

            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const newOtp = [...otp];
        pasted.split("").forEach((digit, index) => {
            newOtp[index] = digit;
        });

        setOtp(newOtp);

        const focusIndex = Math.min(pasted.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSendOtp = async () => {
        if (!email.trim()) return;

        try {
            const response = await forgotPassword(email);
            toast.success(response?.message || "Verification code sent!");
            setOtpSent(true);

            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (error) {
            console.error("Failed to send OTP:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            await handleSendOtp();
            return;
        }

        const code = otp.join("");

        if (code.length !== 6) {
            return toast.error("OTP should be 6 digits");
        }

        if (!isPasswordValid) {
            return toast.error("Please meet all password requirements.");
        }

        try {
            const response = await resetPassword(email, code, password);
            toast.success(
                response?.message || "Password changed successfully!",
            );
            navigate("/auth/login");
        } catch (error) {
            console.error("Failed to reset password:", error);
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-bg-light p-4">
            <div className="w-full max-w-md rounded-3xl border border-border p-6 shadow-sm bg-bg-light">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-semibold text-text">
                        Forgot Password
                    </h1>
                    <p className="mt-2 text-sm text-text-muted">
                        {!otpSent
                            ? "Enter your email address and we'll send you a verification code."
                            : "Enter the verification code sent to your email."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!otpSent ? (
                        <>
                            {/* Email */}
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                                    required
                                />
                            </div>

                            {/* Button */}
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={
                                        !email.trim() || isResetPassLoading
                                    }
                                    className={`mt-2 flex h-12 w-full items-center justify-center rounded-full font-medium text-white transition-opacity ${
                                        email.trim() && !isResetPassLoading
                                            ? "bg-primary hover:opacity-90 cursor-pointer"
                                            : "cursor-not-allowed bg-gray-500 opacity-60"
                                    }`}
                                >
                                    {isResetPassLoading ? (
                                        <Loader className="size-5 animate-spin" />
                                    ) : (
                                        "Send Verification Code"
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Target Email Display */}
                            <div className="rounded-2xl border border-border bg-gray-50/5 p-4 text-center">
                                <p className="text-sm text-text-muted">
                                    Verification code sent to
                                </p>
                                <p className="mt-1 font-medium text-text">
                                    {email}
                                </p>
                            </div>

                            {/* OTP Inputs */}
                            <div className="pt-2">
                                <div
                                    className="flex justify-between gap-2 sm:gap-3"
                                    onPaste={handlePaste}
                                >
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) =>
                                                (inputRefs.current[index] = el)
                                            }
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) =>
                                                handleOtpChange(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(index, e)
                                            }
                                            className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-border bg-transparent text-center text-xl font-medium text-text outline-none transition-colors focus:border-primary"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="pt-2">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Create a new password"
                                    className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
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

                            {/* Change Password Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={!canSubmit || isResetPassLoading}
                                    className={`mt-2 flex h-12 w-full items-center justify-center rounded-full font-medium text-white transition-opacity ${
                                        canSubmit && !isResetPassLoading
                                            ? "bg-primary hover:opacity-90 cursor-pointer"
                                            : "cursor-not-allowed bg-gray-500 opacity-60"
                                    }`}
                                >
                                    {isResetPassLoading ? (
                                        <Loader className="size-5 animate-spin" />
                                    ) : (
                                        "Change Password"
                                    )}
                                </button>
                            </div>

                            {/* Resend Code */}
                            <div className="text-center pt-2">
                                <p className="text-sm text-text-muted">
                                    Didn't receive the code?{" "}
                                    <button
                                        type="button"
                                        disabled={isResetPassLoading}
                                        onClick={handleSendOtp}
                                        className="font-medium cursor-pointer text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Resend Code
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-border pt-5 text-center">
                    <p className="text-sm text-text-muted">
                        Remember your password?{" "}
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

export default ForgotPassword;
