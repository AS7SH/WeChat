import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.js";
import { toast } from "sonner";

const VerifyEmail = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const {
        user,
        isVerifyLoading,
        resendVerificationCode,
        isResendEmailLoading,
        verifyEmail,
    } = useAuth();

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        const newOtp = [...otp];

        pasted.split("").forEach((char, index) => {
            newOtp[index] = char;
        });

        setOtp(newOtp);

        const focusIndex = Math.min(pasted.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleResendCode = async () => {
        try {
            const response = await resendVerificationCode();
            toast.success(response?.message || "Code resent successfully");
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join("");

        if (code.length !== 6) {
            return toast.error("OTP should be 6 digits");
        }

        try {
            console.log(code);
            const response = await verifyEmail(code);
            toast.success(response?.message || "Email verified!");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-bg-light p-4">
            {/* Form Container: Added max-w-md to keep it looking good on large screens */}
            <div className="w-full max-w-md rounded-3xl border border-border p-6 shadow-sm">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-normal text-text">
                        Verify Email
                    </h1>

                    <p className="mt-3 text-text-muted">
                        We've sent a verification code to
                    </p>

                    <p className="mt-1 font-medium text-text">{user?.email}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* OTP Inputs */}
                    <div
                        className="mb-8 flex justify-center gap-3"
                        onPaste={handlePaste}
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                disabled={isVerifyLoading} // Lock inputs while submitting
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`h-14 w-14 rounded-xl border bg-transparent text-center text-xl font-medium text-text outline-none transition-colors focus:border-primary ${
                                    isVerifyLoading
                                        ? "opacity-50 cursor-not-allowed border-border"
                                        : "border-border"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        disabled={isVerifyLoading || otp.join("").length !== 6} // Prevent submission if loading or incomplete
                        className={`h-12 w-full rounded-full bg-primary font-medium text-white transition-opacity ${
                            isVerifyLoading || otp.join("").length !== 6
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer hover:opacity-90"
                        }`}
                    >
                        {isVerifyLoading ? "Verifying..." : "Verify Email"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-border pt-5 text-center">
                    <p className="text-sm text-text-muted">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={isResendEmailLoading} // Fixed: Swapped isLoading for isResendEmailLoading
                            className={`text-sm font-medium text-primary transition-opacity ${
                                isResendEmailLoading
                                    ? "cursor-not-allowed opacity-60"
                                    : "cursor-pointer hover:underline"
                            }`}
                        >
                            {isResendEmailLoading
                                ? "Sending..."
                                : "Resend Code"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
