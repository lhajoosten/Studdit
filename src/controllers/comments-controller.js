const mongoose = require('mongoose');
const Comment = require('../models/comments-model');

module.exports = {
    postComment: (req, res, next) => {
        const body = req.body;

        let comment = new Comment({
            author: body.author,
            content: body.content,
            thread: body.thread
        });

        comment.save().then(() => res.status(200).json({result: "OK"}));
    },

    getAllComments: (req, res, next) => {
        Comment.find({})
            .then((comments) => {
                console.log(comments);
                res.status(200).json({ result: comments });
            });
    },

    getCommentById: (req, res, next) => {
        let commentId = req.params.id;

        Comment.find({_id: commentId})
            .then((comment) => {
                res.status(200).json({ result: comment });
            })
    },

    updateCommentById: (req, res, next) => {
        const id = req.params.id;
        const body = req.body;

        Comment.findOneAndUpdate({_id: id}, body)
            .then(() => Comment.findOne({_id: id}))
            .then((comment) => {
                res.status(200).json({result: comment});
            });
    },

    deleteCommentById: (req, res, next) => {
        const id = req.params.id;
        let c;
        Comment.findOne({_id: id})
            .then((comment) => {
                c = comment;
            })
            .then(() => Comment.findOneAndDelete({_id: id}))
            .then(() => {
                res.status(200).json({result: c});
            });
    },

    postCommentToComment: (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        let c = new Comment({
            author: body.author,
            content: body.content
        });
        Comment.findOne({_id: id})
            .then((comment) => {
                c.thread = comment.thread;
                c.save();
                comment.comments.push(c);
                comment.save();
                res.status(200).json({result: comment});
            });
    },

    upVoteByCommentId: (req, res, next) => {
        const id = req.params.id;

        Comment.update({_id: id}, {$inc: {upVotes: 1}})
            .then(() => Comment.findOne({_id: id}))
            .then((comment) => {
                res.status(200).json({result: comment});
            });
    },

    downVoteByCommentId: (req, res, next) => {
        const id = req.params.id;

        Comment.update({_id: id}, {$inc: {downVotes: 1}})
            .then(() => Comment.findOne({_id: id}))
            .then((comment) => {
                res.status(200).json({result: comment});
            });
    }
}
