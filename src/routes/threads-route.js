const controller = require("../controllers/threads-controller");

module.exports = app => {
  // Thread endpoints
  app.post("/api/thread/", controller.postThread);
  app.put("/api/thread/", controller.updateThread);
  app.delete("/api/thread/", controller.deleteThread);
  app.get("/api/threads", controller.getAllThreads);
  app.get("/api/thread/:id", controller.getThreadById);
  app.post("/api/thread/upvote", controller.upVoteThread);
  app.post("/api/thread/upvote", controller.downVoteThread);
};
