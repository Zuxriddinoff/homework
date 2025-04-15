import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  enrolledCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

export const userSchema = mongoose.model("User", userModel);
