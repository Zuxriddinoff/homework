import { userSchema } from "../models/index.js";

export const userService = {
  findAll: async () => {
    const allUsers = await userSchema.find().populate("enrolledCourse");

    return allUsers;
  },

  create: async (userPost) => {
    const newUser = new userSchema(userPost);
    const savedUser = await newUser.save();
    return savedUser;
  },
};
