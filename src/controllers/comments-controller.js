const mongoose = require('mongoose');
const Comment = require('../models/comments-model');

module.exports = {
    postComment: (req, res, next) => {


    },

    getAllComments: (req, res, next) => {
        /*Comment.find({})
            .then((comments) => {

            });*/
    },

    getCommentById: (req, res, next) => {

    },

    updateCommentById: (req, res, next) => {

    },

    deleteCommentById: (req, res, next) => {

    },

    postCommentToComment: (req, res, next) => {

    },

    upVoteByCommentId: (req, res, next) => {

    },

    downVoteByCommentId: (req, res, next) => {

    }
}
