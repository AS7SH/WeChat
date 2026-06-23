import { z } from "zod";

const passwordSchema = z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
        "Password must include an uppercase letter, a lowercase letter, a number, and a special character",
    );

const emailSchema = z.email("Please enter a valid email address");

const usernameSchema = z
    .string({ required_error: "Username is required" })
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
        /^[a-zA-Z][a-zA-Z0-9_]*$/,
        "Username must start with a letter and contain only letters, numbers, or underscores",
    );

export const signupSchema = z.object({
    username: usernameSchema,
    name: z
        .string({ required_error: "Full name is required" })
        .min(5, "Name must be at least 5 characters")
        .max(30, "Name cannot exceed 30 characters")
        .regex(
            /^[a-zA-Z]+(?:[ ._][a-zA-Z]+)*$/,
            "Name can only contain letters, spaces, dots, and underscores",
        ),
    email: emailSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    identifier: z
        .string({ required_error: "Username or email is required" })
        .min(5, "Please enter your username or email")
        .refine(
            (value) => {
                const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return usernameRegex.test(value) || emailRegex.test(value);
            },
            {
                // Fixed: Zod uses "message", not "error" here
                error: "Please enter a valid username or email format",
            },
        ),
    password: z.string().min(1, "Password is required"), // Simplified for login: don't validate complexity on login, just ensure they typed *something*
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z.object({
    email: emailSchema,
    code: z
        .string({ required_error: "Verification code is required" })
        .min(1, "Please enter the verification code"),
    password: passwordSchema,
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"), // Same logic as login
    newPassword: passwordSchema,
});
