const User = require('../models/users-model');
const Comment = require('../models/comments-model');
const Thread = require('../models/threads-model');

module.exports = {
  DB_URI: "mongodb+srv://lhajoost:Kaya1412@studdit-eklle.mongodb.net/StudditDB?retryWrites=true&w=majority",
  logger: require("tracer").colorConsole({
    format: [
      "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
      {
        error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})" // error format
      }
    ],
    dateformat: "HH:MM:ss.L",
    preprocess: function(data) {
      data.title = data.title.toUpperCase();
    },
    level: process.env.LOG_LEVEL || "trace"
  }),
  createMockData: () => {
    let joe = new User({
      name: 'Joe',
      password: 'Test123!',
      active: true
    });

    joe.save();

    let henk = new User({
      name: 'Henk',
      password: 'TanteBetsie',
      active: true
    });

    henk.save();

    let firstThread = new Thread({
      title: 'The very first Thread',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
          'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      upVotes: 20,
      downVotes: 10,
      author: joe,
      comments: []
    });

    firstThread.save();

    let secondThread = new Thread({
      title: 'Henk wanted a thread to',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
          'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ' +
          'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      upVotes: 2,
      downVotes: 25,
      author: henk
    });

    secondThread.save();

    let firstComment = new Comment({
      author: joe,
      content: 'Why do you copy me',
      thread: secondThread,
      upVotes: 25,
      downVotes: 2
    });

    firstComment.save();

    secondThread.comments.push(firstComment);
  }
};
