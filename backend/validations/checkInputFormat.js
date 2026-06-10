import { z } from "zod";
import { sendResponse } from "../util/sendResponse.js";

const signupSchema = z.object({
    username: z
        .string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be less than 20 characters")
        .regex(
            /^[a-zA-Z][a-zA-Z0-9_]*$/,
            "Username must start with a letter and contain only letters, numbers, and underscores",
        ),
    name: z
        .string()
        .min(3, "Name must be at least 5 characters")
        .max(30, "Name must be less than 30 characters")
        .regex(
            /^[a-zA-Z]+(?:[ ._][a-zA-Z]+)*$/,
            "Name doesnt match the pattern",
        ),
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
            "Password didnt match the pattern",
        ),
});

const signinSchema = z.object({
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
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
            "Password didnt match the pattern",
        ),
});

const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address"),
});

const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
            "Password didnt match the pattern",
        ),
});

const ChangePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
            "Password didnt match the pattern",
        ),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
            "Password didnt match the pattern",
        ),
});

export const checkSignupFormat = (req, res, next) => {
    const { username, password, email, name } = req.body;
    const data = { username, password, email, name };
    const isValid = signupSchema.safeParse(data);

    if (!isValid.success) {
        let errors = z.flattenError(isValid.error);
        return sendResponse(res, 400, false, "invalid details", errors);
    }

    console.log(data);
    next();
};

export const checkSigninFormat = (req, res, next) => {
    const { identifier, password } = req.body;
    const data = { identifier, password };
    const isValid = signinSchema.safeParse(data);

    if (!isValid.success) {
        let errors = z.flattenError(isValid.error);
        return sendResponse(res, 400, false, "invalid details", errors);
    }

    req.identifiedItem = identifier.includes("@") ? "email" : "username";
    console.log(data);
    next();
};

export const checkforgotPasswordFormat = (req, res, next) => {
    const { email } = req.body;

    const isValid = forgotPasswordSchema.safeParse({ email });

    if (!isValid.success) {
        let errors = z.flattenError(isValid.error);
        return sendResponse(res, 400, false, "invalid details", errors);
    }

    next();
};

export const checkResetPasswordFormat = (req, res, next) => {
    const { password } = req.body;

    const isValid = resetPasswordSchema.safeParse({
        password,
    });

    if (!isValid.success) {
        let errors = z.flattenError(isValid.error);
        return sendResponse(res, 400, false, "invalid details", errors);
    }

    next();
};

export const checkChangePasswordFormat = (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const isValid = ChangePasswordSchema.safeParse({
        currentPassword,
        newPassword,
    });

    if (!isValid.success) {
        let errors = z.flattenError(isValid.error);
        return sendResponse(res, 400, false, "invalid details", errors);
    }

    next();
};
