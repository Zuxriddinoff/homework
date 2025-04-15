import mongoose from "mongoose";

const authUserModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const authUserSchema = mongoose.model("AuthUser", authUserModel);