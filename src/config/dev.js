module.exports = {
  DB_URI: "mongodb+srv://lhajoost:Kaya1412@studdit-eklle.mongodb.net/test?retryWrites=true&w=majority",
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
};
