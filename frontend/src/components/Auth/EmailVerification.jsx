import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.jsx";

const EmailVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputRefs = useRef([]);

    const navigate = useNavigate();

    const { verifyEmail, error, user, resendVerificationCode, isLoading } =
        useAuthStore();

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
            toast.success(response.message);
        } catch (e) {
            toast.error(error);
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join("");

        try {
            const response = await verifyEmail(code);
            toast.success(response.message);
            navigate("/");
        } catch (e) {
            toast.error(error);
            console.error(error);
        }
    };

    return (
        <div className="rounded-[28px] border border-border bg-bg-light p-8 md:p-10">
            {/* Heading */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-normal text-text">Verify Email</h1>

                <p className="mt-3 text-text-muted">
                    We've sent a verification code to
                </p>

                <p className="mt-1 font-medium text-text">{user?.email}</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* OTP */}
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
                            onChange={(e) =>
                                handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className=" h-14 w-14 rounded-xl border border-border bg-transparent text-center text-xl font-medium text-text outline-none transition-colors focus:border-primary "
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    type="submit"
                    className=" h-12 w-full rounded-full bg-primary font-medium text-white transition-opacity hover:opacity-90 "
                >
                    Verify Email
                </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-sm text-text-muted">
                    Didn't receive the code?
                </p>

                <button
                    type="button"
                    className=" mt-2 text-sm font-medium text-primary hover:underline "
                    onClick={handleResendCode}
                    disabled={isLoading}
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
