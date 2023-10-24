import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    if (!token)
      return res.sendStatus(400).json({ message: "No token was provided" });

    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
export default verifyToken;
