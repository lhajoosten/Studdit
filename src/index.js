const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const logger = require("./config/dev").logger;
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const db = require("./config/dev").DB_URI;

const app = express();

//require('./config/dev').createMockData();

const commentRoutes = require('./routes/comments-route');
const threadRoutes = require('./routes/threads-route');
const userRoutes = require('./routes/users-route');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => logger.info("DB Connected!"))
  .catch(err => logger.error(err));

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

commentRoutes(app);
threadRoutes(app);
userRoutes(app);

// Handle endpoint not found.
app.all("*", function(req, res, next) {
  logger.error("Endpoint not found.");
  var errorObject = {
    message: "Endpoint does not exist!",
    code: 404,
    date: new Date()
  };
  next(errorObject);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.code).json(error);
});

// Determine on wich port the server is listening to
app.listen(PORT, function() {
  logger.debug("Server is running on port: " + PORT);
});
