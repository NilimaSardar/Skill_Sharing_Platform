const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255, { message: "Email must not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

const signupSchema = loginSchema.extend({
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(255, { message: "Full name must not be more than 255 characters" }),
});

module.exports = { signupSchema, loginSchema };