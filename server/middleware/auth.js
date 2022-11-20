const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded?.id;
      if (decoded) {
        return next();
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorised, token failure" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, not token" });
  }
};

module.exports = auth;
