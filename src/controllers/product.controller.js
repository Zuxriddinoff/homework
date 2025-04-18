import { CustomError } from "../middlewares/errrorhandler.js";
import { Product } from "../models/product.model.js";

export const productController = {
  getall: async (req, res, next) => {
    try {
      const products = await Product.find();
      if (!products) {
        throw new CustomError("Products not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: "Products fetched successfully",
        error: null,
        data: {
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        throw new CustomError("Product not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: "Product fetched successfully",
        error: null,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const body = req.body;
      const product = new Product(body);
      await product.save();

      res.status(201).json({
        status: "success",
        massage: "New product created",
        error: null,
        data: {
          product,
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
      const product = await Product.findById(id);
      if (!product) {
        throw new CustomError("Product not found!", 404);
      }
      await Product.updateOne({ _id: id }, body);
      res.status(200).json({
        status: "success",
        massage: "Product updated successfully",
        error: null,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        throw new CustomError("Product not found!", 404);
      }
      await Product.deleteOne({ _id: id });
      res.status(200).json({
        status: "success",
        massage: "Product deleted successfully",
        error: null,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
