const controller = require("../controllers/users-controller");

module.exports = app => {
  // User endpoints
  app.get("/api/users", controller.index);
  app.post("/api/users", controller.create);

  // /:username -> on base of the username
  app.get("/api/users/:username", controller.read);
  app.put("/api/users/:username", controller.edit);
  app.delete("/api/users/:username", controller.delete);
};
