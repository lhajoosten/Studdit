const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: user => {
    const tokenData = { username: user.username, id: user.id };
    return jwt.sign({ user: tokenData }, "secret", {
      algorithm: "HS256",
      expiresIn: 86400 // expires in 24 hours
    });
  },
  decodeToken: req => {
    const token = req.headers["authorization"].replace(/^JWT\s/, "");
    if (!token) {
      logger.error("invalid token");
      return null;
    }

    try {
      const payload = jwt.decode(token);
      return payload;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },
  requireLogin: (req, res, next) => {
    const token = decodeToken(req);
    if (!token) {
      return res.status(401).json({ message: "You must be logged in." });
    }
    next();
  },
  getUsername: req => {
    const token = decodeToken(req);
    if (!token) {
      return null;
    }
    return token.user.username;
  },

  getUserId: req => {
    const token = decodeToken(req);
    if (!token) {
      return null;
    }
    return token.user.id;
  }
};
