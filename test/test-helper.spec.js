const mongoose = require('mongoose');
const logger = require('../src/config/dev').logger;

mongoose.Promise = global.Promise;

before(done => {
  mongoose
    .connect('mongodb://localhost/user-tests', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      logger.info('Connected to the database');
      done();
    })
    .catch(err => {
      logger.error('Database connection failed');
      done(err);
    });
});

beforeEach(done => {
  const { users, threads, comments } = mongoose.connection.collections;
  users.drop(() => {
    threads.drop(() => {
      comments.drop(() => {
        done();
      });
    });
  });
});
