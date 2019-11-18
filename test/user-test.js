const assert = require("assert");
const User = require("../src/models/users-model");

describe("Creating records", () => {
  let username = "Luc";
  it("Creates a new user", (done) => {
    let user = new User({
      username: "Luc",
      password: "test123"
    });

    user.save()
        .then(() => User.findOne({ name: "Luc" }))
        .then((user) => {
          assert(user.name === "Luc");
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
          assert(user.name === "Luc");
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
          assert(!user.name);
          done();
        });
  });
});
