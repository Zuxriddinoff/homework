import { Course } from "../models/index.js";

import { courseValidation, errorResponse, successRes } from "../utils/index.js";

export class CourseController {
  async create(req, res) {
    try {
      const { data } = courseValidation(req.body);
      const { title, description, teacher } = data;

      const newCourse = await Course.create({ title, description, teacher });

      return successRes(res, 201, {
        message: `success`,
        data: newCourse,
      });
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  async getAll(__, res) {
    try {
      const allCourses = await Course.find();

      return successRes(res, 200, {
        message: "success",
        data: allCourses,
      });
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
