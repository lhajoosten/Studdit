const User = require('../models/users-model');
const bcrypt = require('bcrypt');
const auth = require('../services/authentication');
const mongoose = require('mongoose');

module.exports = {
  getAllUsers: (req, res, next) => {
    User.find({}).then(users => {
      res.status(200).json(users);
    });
  },

  createUser: (req, res, next) => {
    const body = req.body

    User.findOne({ name: body.name }).then(foundUser => {
      if (foundUser == null) {
        let user = new User({
            name: body.name,
            password: body.password,
            active: true
         });        
         user.save()
          .then(() => {
            res.status(201).json({ message: 'Created new user successfully', code: 201 });
          })
          .catch(err => {
            if (err.name === 'ValidationError') {
              res.status(422).json({ err });
            } else {
              res.status(500).json(err);
            }
          });
      } else {
        res.status(409).json({ message: 'Username already taken' });
      }
    });
  },

  getUserByUserame: (req, res, next) => {
    const username = req.params.username;

    User.findOne({ name: username }).then(user => {
      res.status(200).json(user);
    });
  },

  updateUserByUsername: (req, res, next) => {
    const username = req.params.username;
    const body = req.body;
    User.findOneAndUpdate({ name: username }, body)
      .then(() => User.find({ name: username }))
      .then(user => {
        res.status(200).json({ result: user });
      });
  },

  deleteUserByUsername: (req, res, next) => {
    const username = req.params.username;
    let u;

    User.findOne({ name: username })
      .then(user => {
        u = user;
        User.findOneAndDelete({ name: username });
      })
      .then(() => {
        res.status(200).json({ result: u });
      });
  },

  loginUser: (req, res, next) => {
    const body = req.body;
    let h;

    User.findOne({ name: body.username }).then(user => {
      if (!bcrypt.compareSync(body.password, user.password)) {
        let errorObj = {
          message: 'Login not correct',
          code: 400
        };

        next(errorObj);
      } else {
        const token = auth.generateJWT(user);
        res.status(200).json({ result: token });
      }
    });
  }
};
