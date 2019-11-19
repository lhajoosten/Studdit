const mongoose = require('mongoose');
const logger = require('../../src/config/dev').logger;

mongoose.Promise = global.Promise;

before(done => {
  mongoose
    .connect('mongodb+srv://lhajoost:Kaya1412@studdit-eklle.mongodb.net/StudditTestDb?retryWrites=true&w=majority', {
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
