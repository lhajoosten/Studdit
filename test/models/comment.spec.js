const assert = require('assert');
const User = require('../../src/models/users-model');
const Thread = require('../../src/models/threads-model');
const Comment = require('../../src/models/comments-model');

describe('Comments tests', () => {
   let user;
   let thread;
   let comment;

   beforeEach((done) => {
      user = new User({
          name: "Lars2222",
          password: "Test4321"
      });

      user.save()
          .then(() => User.findOne({name: "Lars2222"}))
          .then((u) => {
              user = u;
              thread = new Thread({
                  title: "Test thread for comments",
                  content: "Let those comment tests come",
                  author: u
              });

              thread.save()
                  .then(() => Thread.findOne({author: user._id}))
                  .then((t) => {
                     thread = t;
                     comment = new Comment({
                         author: user,
                         thread: thread,
                         content: "First comment"
                     });

                     comment.save()
                         .then(() => Comment.findOne({thread: thread._id}))
                         .then((c) => {
                             comment = c;
                             done();
                         });
                  });
          });
   });

   it("Creates a new Comment", (done) => {
       let _user = user;
       let _thread = thread;

      let newComment = new Comment({
          author: _user,
          thread: _thread,
          content: "Second created comment"
      });

      newComment.save()
          .then(() => Comment.findOne({content: "Second created comment"}))
          .then((c) => {
              assert(c.author.toString() === _user._id.toString());
              done();
          });
   });

   it("Gets all comments", (done) => {
      Comment.find({})
          .then((comments) => {
             assert(comments.length > 0);
             done();
          });
   });

   it("Get a comment by id", (done) => {
      Comment.findOne({_id: comment._id})
          .then((c) => {
             assert(c.content === comment.content);
             done();
          });
   });

   it('Updates a comment by id', (done) => {
      Comment.findOneAndUpdate({_id: comment._id}, { content: "Updated comment content..."})
          .then(() => Comment.findOne({_id: comment._id}))
          .then((c) => {
             assert(c.content === "Updated comment content...");
             done();
          });
   });

   it('Adds a upvote to a comment by id', (done) => {
       Comment.findOneAndUpdate({_id: comment._id}, {$inc: { upVotes: 1}})
           .then(() => Comment.findOne({_id: comment._id}))
           .then((c) => {
              assert(c.upVotes === 1);
              done();
           });
   });

    it('Adds a downvote to a comment by id', (done) => {
        Comment.findOneAndUpdate({_id: comment._id}, {$inc: { downVotes: 1}})
            .then(() => Comment.findOne({_id: comment._id}))
            .then((c) => {
                assert(c.downVotes === 1);
                done();
            });
    });

    it("Adds a comment to a comment by id", (done) => {
       let newComment = new Comment({
           author: user,
           thread: thread,
           content: "Response of author of this comment"
       });

       newComment.save()
           .then(() => Comment.findOne({content: "Response of author of this comment"}))
           .then((c) => {
              newComment = c;
              comment.comments.push(newComment);
              comment.save()
                  .then(() => Comment.findById(comment._id))
                  .then((com) => {
                      assert(com.comments.length > 0);
                      done();
                  });
           });
    });

    it("Deletes a comment by id", (done) =>{
       Comment.findOneAndDelete({_id: comment._id})
           .then(() => Comment.findById(comment._id))
           .then((c) => {
               assert(!c);
               done();
           });
    });
});
