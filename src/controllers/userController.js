import { userService } from "../services/index.js";

export const userController = {
  findAll: async (req, res, next) => {
    try {
      const allUsers = await userService.findAll();

      if (allUsers.length === 0)
        return res.status(404).json({ message: "Users not found " });

      res.json(allUsers);
    } catch (error) {
      next(error);
    }
  },

  findOne: () => {},

  create: async (req, res, next) => {
    try {
      const { name, email, password, enrolledCourse } = req.body;

      if (!name || !email || !password || !enrolledCourse)
        return res.status(404).json({ message: "All data is required" });

      const userPost = await userService.create({
        name,
        email,
        password,
        enrolledCourse,
      });

      res.status(201).json(userPost);
    } catch (error) {
      next(error);
    }
  },
};
