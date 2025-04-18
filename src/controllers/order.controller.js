import { CustomError } from "../middlewares/errrorhandler.js";
import { Order } from "../models/order.model.js";

export const orderController = {
  getall: async (req, res, next) => {
    try {
      const orders = await Order.find();
      if (!orders) {
        throw new CustomError("Orders not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: "Orders fetched successfully",
        error: null,
        data: {
          orders,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        throw new CustomError("Order not found!", 404);
      }
      res.status(200).json({
        status: "success",
        massage: "Order fetched successfully",
        error: null,
        data: {
          order,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const body = req.body;
      const order = new Order(body);
      await order.save();

      res.status(201).json({
        status: "success",
        massage: "New order created",
        error: null,
        data: {
          order,
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
      const order = await Order.findById(id);
      if (!order) {
        throw new CustomError("Order not found!", 404);
      }
      await Order.updateOne({ _id: id }, body);
      res.status(200).json({
        status: "success",
        massage: "Order updated successfully",
        error: null,
        data: {
          order,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        throw new CustomError("Order not found!", 404);
      }
      await Order.deleteOne({ _id: id });
      res.status(200).json({
        status: "success",
        massage: "Order deleted successfully",
        error: null,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
