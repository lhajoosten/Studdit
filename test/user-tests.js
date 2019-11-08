const assert = require("assert");
const User = require("../src/models/users-model");

describe("Creating records", () => {
  it("Creates a new user", () => {
    const user = new User({
      username: "Luc",
      password: "test123"
    });

    user.save();
  });
});
