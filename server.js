import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/index.js";

const PORT = 3000;
const app = express();

// middleware
app.use(express.json());

const users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: hashedPassword,
  };

  users.push(newUser);

  res.json({ data: newUser, message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username: user.username }, "Olma", {
    expiresIn: "1h",
  });

  res.json({
    message: "Login successful",
    user: { username: user.username },
    token,
  });
});

app.get("/users", verifyToken,(req, res) => {
  res.json({ data: users });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
