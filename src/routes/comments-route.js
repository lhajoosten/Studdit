const controller = require("../controllers/comments-controller");

module.exports = app => {
  // Comment endpoints
  app.post("/api/comments", controller.postComment);
  app.get("/api/comments", controller.getAllComments);

  app.get("/api/comments/:id", controller.getCommentById);
  app.put("/api/comments/:id", controller.updateCommentById);
  app.delete("/api/comments/:id", controller.deleteCommentById);

  app.post("/api/comments/:id/comment", controller.postCommentToComment);
  app.post("/api/comments/:id/upvote", controller.upVoteByCommentId);
  app.post("/api/comments/:id/downvote", controller.downVoteByCommentId);
};
