const assert = require("assert");
const User = require("../../src/models/users-model");

describe("Creating records", () => {
  let username = "Luccccc";
  let u;

  beforeEach((done) => {
    u = new User({ name: username, password: "test1234" });
    u.save()
        .then(() => {
          done();
        });
  });

  it("Creates a new user", (done) => {
    let user = new User({
      name: "username",
      password: "test123!"
    });

    user.save()
        .then(() => User.findOne({ name: "username" }))
        .then((user) => {
          assert(user.name === "username");
          done();
        });
  });

  it("Gets all the users", (done) => {
    User.find({})
        .then((users) => {
          assert(users.length > 0);
          done();
        });
  });

  it("Gets a user by username", (done) => {
    User.findOne({name: username})
        .then((user) => {
          assert(user.name === username);
          done();
        });
  });

  it('Updates a user by username', (done) => {
    User.findOneAndUpdate({name: username}, {name: "Lars"})
        .then(() => User.findOne({name: "Lars"}))
        .then((user) => {
          assert(user.name === "Lars");
          username = "Lars";
          done();
        });
  });

  it("Deletes a user by username", (done) => {
    User.findOneAndDelete({name: username})
        .then(() => User.findOne({name: username}))
        .then((user) => {
          assert(!user);
          done();
        });
  });
});
