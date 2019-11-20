const assert = require('assert');
const User = require('../../src/models/users-model');
const logger = require('../../src/config/dev').logger;

describe('Creating records', () => {
  let username = 'Luccccc';
  let u;

  beforeEach(done => {
    u = new User({ name: username, password: 'test1234' });
    u.save().then(() => {
      done();
    });
  });

  it('Creates a new user', done => {
    let user = new User({
      name: 'username',
      password: 'test123!'
    });

    user
      .save()
      .then(() => User.findOne({ name: 'username' }))
      .then(user => {
        assert(user.name === 'username');
        done();
      });
  });

  it('Does not create a new user when name is lesser than 3 characters', done => {
    let user = new User({
      name: 'u',
      password: 'test123!'
    });

    user.save().catch(err => {
      assert(err.name, 'ValidationError');
      done();
    });
  });

  it('Does not create a new user when password is lesser than 8 characters', done => {
    let user = new User({
      name: username,
      password: 'test!'
    });

    user.save().catch(err => {
      assert(err.name, 'ValidationError');
      done();
    });
  });

  it('Does not create a new user when password is not given', done => {
    let user = new User({
      name: username
    });

    user.save().catch(err => {
      assert(err.name, 'ValidationError');
      done();
    });
  });

  it('Does not create a new user when username is not given', done => {
    let user = new User({
      password: 'Test12342309i0'
    });

    user.save().catch(err => {
      assert(err.name, 'ValidationError');
      done();
    });
  });

  it('Gets all the users', done => {
    User.find({}).then(users => {
      assert(users.length > 0);
      done();
    });
  });

  it('Gets a user by username', done => {
    User.findOne({ name: username }).then(user => {
      assert(user.name === username);
      done();
    });
  });

  it('Updates a user by username', done => {
    User.findOneAndUpdate({ name: username }, { name: 'Lars' })
      .then(() => User.findOne({ name: 'Lars' }))
      .then(user => {
        assert(user.name === 'Lars');
        username = 'Lars';
        done();
      });
  });

  it('Does not update a user with validation errors', done => {
    User.findOneAndUpdate({ name: username }, { name: 'L' }).then(err => {
      assert(err.name, 'ValidationError');
      done();
    });
  });

  it('Deletes a user by username', done => {
    User.findOneAndDelete({ name: username })
      .then(() => User.findOne({ name: username }))
      .then(user => {
        assert(!user);
        done();
      });
  });
});
