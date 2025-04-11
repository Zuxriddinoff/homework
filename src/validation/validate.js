import { z } from "zod";

export const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  release_date: z.coerce.date().refine((date) => date.getFullYear() > 1800, {
    message: "Release date must be after the year 1800",
  }),
});

export const bookUpdateSchema = bookSchema.partial();
