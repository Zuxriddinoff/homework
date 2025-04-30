import { User } from "../models/index.js";

import {
  comparePass,
  cookie,
  errorResponse,
  generateToken,
  hashPass,
  successRes,
  userValidation,
} from "../utils/index.js";

export class AdminController {
  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const existsAdmin = await User.findOne({ email });

      if (!existsAdmin) {
        return errorResponse(res, 404, `Admin not found`);
      }

      const isMatch = await comparePass(password, existsAdmin.password);

      if (!isMatch) {
        return errorResponse(res, 401, `Invalid password`);
      }

      const payload = {
        sub: existsAdmin._id,
        role: existsAdmin.role,
      };

      const token = generateToken(payload);

      const { accessToken, refreshToken } = token;
      cookie(res, refreshToken);
      return successRes(res, 200, `Admin logged in successfully`, accessToken);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  async profileAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const existsAdmin = await User.findOne({ email });

      if (!existsAdmin) {
        return errorResponse(res, 404, `Admin not found`);
      }

      const isMatch = await comparePass(password, existsAdmin.password);

      if (!isMatch) {
        return errorResponse(res, 401, `Invalid password`);
      }

      return successRes(res, 200, `Admin profile`, existsAdmin);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  async getAllUsers(__, res) {
    try {
      const allUsers = await User.find({ role: "user" });

      return successRes(res, 200, `success`, allUsers);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  async updateUserByID(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorResponse(res, 400, `ID not found`);
      }

      const user = await User.findByIdAndUpdate(id, req.body, { new: true });

      return successRes(res, 200, "success", user);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  async deleteUserByID(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorResponse(res, 400, `ID not found`);
      }

      await User.findByIdAndDelete(id);

      return successRes(res, 200, "User deleted successfully");
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
