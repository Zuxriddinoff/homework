import { comparePassword } from "../library/hashing.js";
import { authUserSchema } from "../models/index.js";

export const authUserService = {
  register: async (body) => {
    const existingUser = await authUserSchema.findOne(
      { email: body.email },
      "email _id"
    ).exec();

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = new authUserSchema(body);
    await newUser.save();

    return newUser;
  },

  login: async (email, password) => {
    const user = await authUserSchema.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const isMatch = await comparePassword(password,user.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      throw error;
    }

    return user;
  },
};
