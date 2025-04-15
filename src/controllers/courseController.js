import { courseService } from "../services/index.js";

export const courseController = {
  findAll: async (req, res, next) => {
    try {
      const allCourses = await courseService.findAll();

      if (allCourses.length === 0)
        return res.status(404).json({ message: "Courses not found " });

      res.json(allCourses);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { title, description, teacher } = req.body;

      if (!title || !description || !teacher)
        return res.status(404).json({ message: "All data is required" });

      const coursePost = await courseService.create({
        title,
        description,
        teacher,
      });

      res.status(201).json(coursePost);
    } catch (error) {
      next(error);
    }
  },
};
