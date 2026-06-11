import { useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { HelpCircle, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [password, setPassword] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/;
    const canSubmit = passwordRegex.test(password);
    const { forgotPassword, isLoading, error, resetPassword } = useAuthStore();

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
            // await forgotPassword(email)
            const response = await forgotPassword(email);
            toast.success(response.message);
            setOtpSent(true);

            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (err) {
            toast.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) {
            return toast("OTP should be of length 6");
        }

        try {
            const response = await resetPassword(email, code, password);
            toast.success(response.message);
            navigate("/auth/login");
        } catch (err) {
            toast.error(error);
            console.error(error);
        }
    };

    return (
        <div className="auth-card border border-border bg-bg-light rounded-3xl p-6">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-semibold text-text">
                    Forgot Password
                </h1>

                <p className="mt-2 text-sm text-text-muted">
                    {!otpSent
                        ? "Enter your email address and we'll send you a verification code."
                        : "Enter the verification code sent to your email."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {!otpSent ? (
                    <>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-text"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-12 w-full rounded-xl border border-border bg-transparent px-4 text-text outline-none transition-colors focus:border-primary"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={!email.trim()}
                            className=" h-12 w-full rounded-full border border-border bg-transparent font-medium text-text transition-colors hover:bg-bg disabled:cursor-not-allowed disabled:opacity-50 "
                        >
                            {isLoading ? (
                                <Loader className="mx-auto size-8 animate-spin" />
                            ) : (
                                "Send Verification Code"
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <div className="rounded-2xl border border-border bg-bg p-4 text-center">
                            <p className="text-sm text-text-muted">
                                Verification code sent to
                            </p>

                            <p className="mt-1 font-medium text-text">
                                {email}
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-text">
                                Verification Code
                            </label>

                            <div
                                className="flex justify-center gap-3"
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
                                        className=" h-14 w-14 rounded-xl border border-border bg-transparent text-center text-xl font-medium text-text outline-none transition-colors focus:border-primary "
                                    />
                                ))}
                            </div>
                        </div>

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
                                                    password.length >= 8
                                                        ? "text-green-500"
                                                        : "text-text-muted"
                                                }
                                            >
                                                ✓ At least 8 characters
                                            </li>

                                            <li
                                                className={
                                                    /[A-Z]/.test(password)
                                                        ? "text-green-500"
                                                        : "text-text-muted"
                                                }
                                            >
                                                ✓ One uppercase letter
                                            </li>

                                            <li
                                                className={
                                                    /[a-z]/.test(password)
                                                        ? "text-green-500"
                                                        : "text-text-muted"
                                                }
                                            >
                                                ✓ One lowercase letter
                                            </li>

                                            <li
                                                className={
                                                    /\d/.test(password)
                                                        ? "text-green-500"
                                                        : "text-text-muted"
                                                }
                                            >
                                                ✓ One number
                                            </li>

                                            <li
                                                className={
                                                    /[@$!%*?&_#]/.test(password)
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                className={`mt-2 h-12 w-full rounded-full cursor-pointer font-medium text-white transition-opacity ${
                                    canSubmit
                                        ? "bg-primary hover:opacity-90"
                                        : "cursor-not-allowed bg-gray-500 opacity-60"
                                }`}
                            >
                                Change Password
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-text-muted">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={handleSendOtp}
                                    className=" mt-2 text-sm cursor-pointer font-medium text-primary"
                                >
                                    Resend Code
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </form>

            <div className="mt-6 border-t border-border pt-6 text-center">
                <Link
                    to={"/auth/login"}
                    className=" text-sm cursor-pointer font-medium text-text hover:text-primary "
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
