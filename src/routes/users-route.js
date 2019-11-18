const controller = require("../controllers/users-controller");
const auth = require('../services/authentication');

module.exports = app => {
  // User endpoints
  app.get("/api/users", auth.validateToken,  controller.getAllUsers);
  app.post("/api/users", controller.createUser);

  // /:username -> on base of the username
  app.get("/api/users/:username", auth.validateToken,  controller.getUserByUserame);
  app.put("/api/users/:username", auth.validateToken,  controller.updateUserByUsername);
  app.delete("/api/users/:username", auth.validateToken,  controller.deleteUserByUsername);

  app.post('/api/users/login', controller.loginUser);
};
