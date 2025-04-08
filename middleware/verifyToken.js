import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers["token"]?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Token is required" });

  jwt.verify(token, "Olma", (err, res) => {

    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = res
    next()
  });
};
