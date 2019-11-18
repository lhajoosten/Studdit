const mongoose = require('mongoose');
const logger = require('../src/config/dev').logger;

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/user-tests?socketTimeoutMS=90000', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      logger.warn('Warning', error);
      done();
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
