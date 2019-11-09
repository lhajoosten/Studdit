const mongoose = require("mongoose");

const threadShema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required to write a new thread!"]
  },
  title: {
    type: String,
    required: [true, "Title is required!"]
  },
  content: {
    type: String,
    required: [true, "Thread content is required!"]
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Thread", threadShema);
