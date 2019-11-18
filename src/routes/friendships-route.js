const controller = require("../controller/friendships-controller");
const auth = require('../services/authentication');

module.exports = app => {
    // Friendships endpoints
    app.post("/api/friendships", auth.validateToken,  controller.addFriendship);
    app.delete("/api/friendships", auth.validateToken,  controller.deleteFriendship);

  };