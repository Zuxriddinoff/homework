import mongoose from "mongoose";

const courseModel = new mongoose.Schema({
  title: String,
  description: String,
  teacher: String,
});

export const courseSchema = mongoose.model("Course", courseModel);
