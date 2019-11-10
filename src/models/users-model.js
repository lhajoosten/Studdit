const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than two characters!"
    },
    required: [true, "Name is required!"]
  },
  password: {
    type: String,
    validate: {
      validator: password => password.length > 7,
      message: "Password must be at least eight characters!"
    },
    required: [true, "Password is required!"]
  },
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thread"
    }
  ],
  active: {
    type: Boolean,
    default: true
  }
});

userSchema.pre("save", function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

//Every user have acces to this methods
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
