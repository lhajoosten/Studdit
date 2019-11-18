const session = require('../services//neo4j').driver();
const User = require('../models/users-model');

module.exports = {
  create(req, res) {
    const user = req.body.username;
    const friend = req.body.friendname;

    if (user === undefined || friend === undefined) {
      res.status(409).json({ error: "Username or friend's username missing!" });
    }

    // looking up the user if he/she exists in the mongo database
    User.findOne({ name: user }).then((err, user) => {
      // if there are any errors return status 500 with error object
      if (err) {
        return res.status(500).json({ err });
      }
      // if the user was not found return status 404 with user not found message
      if (!user) {
        return res.status(404).Json({ message: 'User was not found!' });
      }
      // else continue to look for the friend
      else {
        // looking up the friend if he/she exists in the mongo database
        User.findOne({ name: friend }).then((err, friend) => {
          // if there are any errors return status 500 with error object
          if (err) {
            return res.status(500).json({ err });
          }
          // if the user was not found return status 404 with user not found message
          if (!friend) {
            return res.status(404).Json({ message: 'Friend was not found!' });
          } 
          // else continue to create friendship in neo4j database with session
          else {
              // TODO: creating friendship in neo4j database
          }
        });
      }
    });
  }
};
