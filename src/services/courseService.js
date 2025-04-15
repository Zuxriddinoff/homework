import { courseSchema } from "../models/index.js";

export const courseService = {
  findAll: async () => {
    const allCourses = await courseSchema.find();

    return allCourses;
  },

  create: async (coursePost) => {
    const newCourse = new courseSchema(coursePost);
    const savedCourse = await newCourse.save();
    return savedCourse;
  },
};
