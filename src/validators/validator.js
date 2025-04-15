import z from "zod";

// User Schema
export const userSchemaValidation = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
  enrolledCourse: z.string(),
});

// Course Schema
export const courseSchemaValidation = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  teacher: z.string().min(5),
});

// Auth User Schema
export const authUserSchemaValidationRegister = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string(),
});

export const authUserSchemaValidationLogin =
  authUserSchemaValidationRegister.partial();
