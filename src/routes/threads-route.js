const controller = require("../controllers/threads-controller");

module.exports = app => {
  // Thread endpoints
  app.post("/api/threads/", controller.postThread);
  app.get("/api/threads", controller.getAllThreads);

  app.get("/api/threads/:id", controller.getThreadById);
  app.put("/api/threads/:id", controller.updateThreadById);
  app.delete("/api/threads/:id", controller.deleteThreadById);

  app.post("/api/threads/:id/comment", controller.postCommentToThread);
  app.post("/api/threads/:id/upvote", controller.upVoteThreadById);
  app.post("/api/threads/:id/downvote", controller.downVoteThreadById);
};
