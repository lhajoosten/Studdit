const controller = require("../controllers/comments-controller");
const auth = require('../services/authentication');

module.exports = app => {
  // Comment endpoints
  app.post("/api/comments", auth.validateToken,  controller.postComment);
  app.get("/api/comments", auth.validateToken,  controller.getAllComments);

  app.get("/api/comments/:id", auth.validateToken,  controller.getCommentById);
  app.put("/api/comments/:id", auth.validateToken,  controller.updateCommentById);
  app.delete("/api/comments/:id", auth.validateToken,  controller.deleteCommentById);

  app.post("/api/comments/:id/comment", auth.validateToken,  controller.postCommentToComment);
  app.post("/api/comments/:id/upvote", auth.validateToken,  controller.upVoteByCommentId);
  app.post("/api/comments/:id/downvote", auth.validateToken,  controller.downVoteByCommentId);
};
