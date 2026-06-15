import { z } from "zod";

// Define reusable base fields
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
        "Password didnt match the pattern",
    );

const emailSchema = z.email("Invalid email address");

const usernameSchema = z
    .string()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z][a-zA-Z0-9_]*$/);

export const signupSchema = z.object({
    username: usernameSchema,
    name: z
        .string()
        .min(5)
        .max(30)
        .regex(/^[a-zA-Z]+(?:[ ._][a-zA-Z]+)*$/),
    email: emailSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(5, "Username or Email is required")
        .refine(
            (value) => {
                const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return usernameRegex.test(value) || emailRegex.test(value);
            },
            {
                error: "Enter a valid Username or Email",
            },
        ),
    password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export const resetPasswordSchema = z.object({
    email: emailSchema,
    code: z.string().min(1, "Verification code is required"),
    password: passwordSchema,
});

export const changePasswordSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
});
