import { generateTokens, hashedPassword } from "../library/index.js";
import { authUserService } from "../services/index.js";

export const authUserController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(404).json({ message: "All data is required" });

      const passwordHashed = await hashedPassword(password);

      const newUser = await authUserService.register({
        name,
        email,
        password: passwordHashed,
      });

      const payload = { id: newUser._id, email: newUser.email };
      const token = generateTokens(payload);
      res.status(201).json({ user: newUser, ...token });
    } catch (err) {
      if (err.message === "User already exists") {
        return res.status(400).send(err.message);
      }
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await authUserService.login(email, password);

      const payload = { id: user._id, email: user.email };
      const tokens = generateTokens(payload);
      res.json({ user, ...tokens });
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message });
    }
  },
};
