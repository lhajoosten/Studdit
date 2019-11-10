const controller = require("../controllers/users-controller");

module.exports = app => {
  // User endpoints
  app.get("/api/users", controller.getAllUsers);
  app.post("/api/users", controller.createUser);

  // /:username -> on base of the username
  app.get("/api/users/:username", controller.getUserByUserame);
  app.put("/api/users/:username", controller.updateUserByUsername);
  app.delete("/api/users/:username", controller.deleteUserByUsername);

  app.post('/api/users/login', controller.loginUser);
};
