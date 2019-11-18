const mongoose = require('mongoose');
const auth = require('../services/authentication');
const Thread = require('../models/threads-model');
const Comment = require('../models/comments-model');

module.exports = {
    postThread: (req, res, next) => {
        const body = req.body;

        let thread = new Thread({
            author: req.userId,
            title: body.title,
            content: body.content
        });

        thread.save()
            .then(() => {
                res.status(200).json({result: "OK"});
            });
    },

    getAllThreads: (req, res, next) => {
        Thread.find({})
            .populate('comments')
            .populate('author')
            .then((threads) => {
               res.status(200).json({ result: threads });
            })
            .catch((err) => {
                next({
                    message: 'something went wrong',
                    code: 400
                });
            });
    },

    getThreadById: (req, res, next) => {
        const id = req.params.id;
        Thread.find({_id: id})
            .populate('comments')
            .populate('author')
            .then((thread) => {
                res.status(200).json({ result: thread });
            });
    },

    updateThreadById: (req, res, next) => {
        const id = req.params.id;
        const body = req.body;

        Thread.findOneAndUpdate({_id: id}, body)
            .then(() => Thread.findOne({_id, id}))
            .then((thread) => {
                res.status(200).json({result: thread});
            });
    },

    deleteThreadById: (req, res, next) => {
        const id = req.params.id;
        let t;
        Thread.findOne({_id: id})
            .then((thread) => {
                t = thread;
            })
            .then(() => Thread.findOneAndDelete({_id: id}))
            .then(() => {
                res.status(200).json({result: t});
            });
    },

    postCommentToThread: (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        let comment = new Comment({
            author: req.userId,
            content: body.content
        });
        Thread.findOne({_id: id})
            .then((thread) => {
                comment.thread = thread;
                comment.save();
                thread.comments.push(comment);
                thread.save();
                res.status(200).json({result: thread});
            });


    },

    upVoteThreadById: (req, res, next) => {
        const id = req.params.id;

        Thread.update({_id: id}, {$inc: {upVotes: 1}})
            .then(() => Thread.findOne({_id: id}))
            .then((thread) => {
                res.status(200).json({result: thread});
            });
    },

    downVoteThreadById: (req, res, next) => {
        const id = req.params.id;

        Thread.update({_id: id}, {$inc: {downVotes: 1}})
            .then(() => Thread.findOne({_id: id}))
            .then((thread) => {
                res.status(200).json({result: thread});
            });
    }
}
