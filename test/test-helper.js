const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/user-tests", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      logger.warn("Warning", error);
    });
});

beforeEach(done => {
  const { users, threads } = mongoose.connection.collections;
  users.drop(() => {
    threads.drop(() => {
      done();
    });
  });


});
