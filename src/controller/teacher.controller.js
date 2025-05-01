import { hashPass, successRes, errorResponse } from "../utils/index.js";

export class TeacherController {
  async registerTeacher(req, res) {
    try {
      const { data } = userValidation(req.body);

      const { name, email, password } = data;

      const existsUser = await User.findOne({ email });

      if (existsUser) {
        return errorResponse(res, 409, `Teacher already exists`);
      }

      const encodedPass = await hashPass(password);

      const newTeacher = await User.create({
        name,
        email,
        password: encodedPass,
        role: "teacher",
        enrolledCourse_id: null,
        otp_secret: null,
        otp_enabled: null,
      });

      //   const { token } = await generateOtp(newTeacher.id);
      //   await transporter(
      //     email,
      //     `Verify your email`,
      //     `Your otp code is: ${token}`
      //   );

      return successRes(
        res,
        201,
        "Teacher registered successfully",
        newTeacher._id
      );
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
