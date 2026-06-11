import { useRef, useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);

    const inputRefs = useRef([]);

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

            setOtpSent(true);

            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) return;

        try {
            console.log({
                email,
                otp: code,
            });

            // verify otp api
        } catch (error) {
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
                            Send Verification Code
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

                        <button
                            type="submit"
                            className=" h-12 w-full rounded-full bg-primary font-medium text-white transition-opacity hover:opacity-90 "
                        >
                            Verify & Continue
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-text-muted">
                                Didn't receive the code?
                            </p>

                            <button
                                type="button"
                                className=" mt-2 text-sm font-medium text-primary hover:underline "
                            >
                                Resend Code
                            </button>
                        </div>
                    </>
                )}
            </form>

            <div className="mt-6 border-t border-border pt-6 text-center">
                <button
                    type="button"
                    className=" text-sm font-medium text-text hover:text-primary "
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
