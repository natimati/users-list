const jwt = require("jsonwebtoken");
const { getOneById } = require("../models/user");
const tokenJwtSecret = process.env.ACCESS_TOKEN_SECRET;

const authMiddlewere = async (req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");

  try {
    const decoded = jwt.decode(token);
    if (decoded.id) {
      await getOneById(decoded.id)
    }
  } catch(e) {
    return res
      .status(401)
      .json({ message: "It's not authorized, token not available" })
  }

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
