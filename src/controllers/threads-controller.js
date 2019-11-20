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
            .then(() => Thread.findOne({author: req.userId, title: body.title, content: body.content}))
            .then((t) => {
                res.status(200).json({result: t});
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                  res.status(422).json({ err });
                } else {
                  res.status(500).json(err);
                }
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
        Thread.findOne({_id: id})
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
            .then(() => Thread.findById(id))
            .then((thread) => {
                res.status(200).json({result: thread});
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                  res.status(422).json({ err });
                } else {
                  res.status(500).json(err);
                }
              });
    },

    deleteThreadById: (req, res, next) => {
        const id = req.params.id;
        
        Thread.findOneAndDelete({_id: id})
            .then((thread) => {
                res.status(200).json({result: thread});
            });
    },

    postCommentToThread: (req, res, next) => {
        const id = req.params.id;
        const body = req.body;

        Thread.findOne({_id: id})
            .then((thread) => {
                let comment = new Comment({
                    author: req.userId,
                    content: body.content,
                    thread: thread
                });
                comment.save()
                    .then(() => Comment.findOne({author: req.userId, content: body.content, thread: thread._id}))
                    .then((c) => {
                        thread.comments.push(c);
                        thread.save()
                            .then(() => Thread.findById(thread._id))
                            .then((t) => {
                                res.status(200).json({result: t});
                            });

                    });

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
