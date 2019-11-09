const controller = require("../controllers/comments-controller");

module.exports = app => {
  // Comment endpoints
  app.post("/api/thread/comment", controller.postComment);
  app.put("/api/comment/:id", controller.updateComment);
  app.delete("/api/comment/:id", controller.deleteComment);
};
