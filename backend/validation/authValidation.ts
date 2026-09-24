import {z} from "zod";

const registerSchemaObject = {
  username: z.string({
    error: "Username is required"
  }).min(3, "Username must be at least 3 characters").max(35, "Username must be less than 30 characters").trim(),

  email: z.string({
    error: "Email is required"
  }).email("Email is invalid").trim(),

  password: z.string({
    error: "Password is required"
  }).min(4, "Password must be at least 4 characters").max(100, "Password must be less than 100 characters"),
}

const changePasswordSchemaObject = {
  currentPassword: z.string({
    error: "Current password is required"
  }).min(4, "Current password must be at least 4 characters").max(100, "Current password must be less than 100 characters"),

  newPassword: z.string({
    error: "New password is required"
  }).min(4, "New password must be at least 4 characters").max(100, "New password must be less than 100 characters"),
}

export const changePasswordSchema = z.object(changePasswordSchemaObject)

export const registerSchema = z.object(registerSchemaObject)


const loginSchemaObject = {
  email: z.string({
    error: "Email is required"
  }).email("Email is invalid").trim(),

  password: z.string({
    error: "Password is required"
  }).min(4, "Password must be at least 4 characters"),
}

export const loginSchema = z.object(loginSchemaObject)

export type LoginInput = z.output<typeof loginSchema>

export type RegisterInput = z.output<typeof registerSchema>