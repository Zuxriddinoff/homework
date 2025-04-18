import { CustomError } from "../middlewares/errrorhandler.js";
import { Category } from "../models/category.model.js";

export const categoryController = {
  getall: async (req, res, next) => {
    try {
      const category = await Category.find();
      if (!category) {
        throw new CustomError("category not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: " category find successfully",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        throw new CustomError("category not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: " category find successfully",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const body = req.body;
      const category = new Category(body);
      await category.save();

      res.json({
        status: "success",
        massage: "create new category",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await Category.findById(id);
      if (!category) {
        throw new CustomError("category not found!", 404);
      }
      await Category.updateOne({ _id: id }, body);
      res.status(200).json({
        status: "success",
        massage: " category update successfully",
        error: null,
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = Category.findById(id);
      if (!category) {
        throw new CustomError("category not found!", 404);
      }
      await Category.deleteOne({ _id: id });
        res.status(200).json({
          status: "success",
          massage: "delete user successfully",
          error: null,
          data: null,
        });
    } catch (error) {
      next(error);
    }
  },
};
