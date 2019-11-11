const controller = require("../controllers/threads-controller");
const auth = require('../services/authentication');

module.exports = app => {
  // Thread endpoints
  app.post("/api/threads/", auth.validateToken, controller.postThread);
  app.get("/api/threads", auth.validateToken,  controller.getAllThreads);

  app.get("/api/threads/:id", auth.validateToken,  controller.getThreadById);
  app.put("/api/threads/:id", auth.validateToken,  controller.updateThreadById);
  app.delete("/api/threads/:id", auth.validateToken,  controller.deleteThreadById);

  app.post("/api/threads/:id/comment", auth.validateToken,  controller.postCommentToThread);
  app.post("/api/threads/:id/upvote", auth.validateToken,  controller.upVoteThreadById);
  app.post("/api/threads/:id/downvote", auth.validateToken,  controller.downVoteThreadById);
};
