const jwt = require("jsonwebtoken");
const tokenJwtSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddlewere = (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");

  if (token) {
    jwt.verify(token, tokenJwtSecret, (e) => {
      if (e) {
        return res.status(401).json({ message: "It's not authorized" })
      }
      next();
      return null
    });
  } else {
    return res
      .status(401)
      .json({ message: "It's not authorized, token not available" })
  }
  return null;
};

module.exports = authMiddlewere;
