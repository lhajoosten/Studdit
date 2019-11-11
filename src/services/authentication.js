const jwt = require("jsonwebtoken");
const logger = require('../config/dev').logger;

module.exports = {
  generateJWT: user => {
    const tokenData = { username: user.name, id: user.id };
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
  },

  validateToken: (req, res, next) => {
    logger.info('validateToken aangeroepen');
    // logger.debug(req.headers)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      logger.warn('Validate token failed: ', errorObject.message);
      return next({
        message: 'No authorization',
        code: 404
      });
    }
    const token = authHeader.substring(7, authHeader.length);
    jwt.verify(token, 'secret', (err, payload) => {
      if (err) {
        logger.warn('Validate token failed: ', errorObject.message);
        next({
          message: 'not authorized',
          code: 404
        });
      }
      //logger.trace('payload', payload);
      if (payload.user && payload.user.id) {
        logger.debug('token is valid', payload);
        // User heeft toegang. Voeg UserId uit payload toe aan
        // request, voor ieder volgend endpoint.
        req.userId = payload.user.id;
        req.username = payload.user.username;
        req.token = token;
        next();
      } else {
        logger.warn('Validate token failed: ', errorObject.message);
        next({message: 'Missing user id',
        code: 404});
      }
    })
  }
};
