import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    teacher: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = model("Course", courseSchema);
