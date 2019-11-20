const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;
const Thread = require('../../src/models/threads-model');
const User = require('../../src/models/users-model');
const Comment = require('../../src/models/comments-model');

chai.should();
chai.use(chaiHttp);


const username = 'TestUser404';
const password = '8080751807';

let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9lIiwiaWQiOiI1ZGM4MjYwNmM5ODliYTBlMTBhY2NjYTEifSwiaWF0IjoxNTc0MTA0MTMxLCJleHAiOjE1NzQxOTA1MzF9.jHCzX90v3yLW2Ga0R6FyhTHPYhoSi3IIRr9T6XXFf9E';

let correctToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiVGVzdGVyNTYiLCJpZCI6IjVkZDUzNmEyNTJiNGNlMjc0ODk1NjI0NSJ9LCJpYXQiOjE1NzQyNTQyOTksImV4cCI6MjE3OTA1NDI5OX0.8EUFqUOIw9FhcU43iT7aJI_4JB2somdYqtw-LdP2C1c';

function noAuthorizationHeader(res, done, err) {
    if (err) {
        done();
    }
    expect(res).to.exist;
    expect(res).to.have.status(401);
    expect(res.body)
        .to.have.property('message')
        .to.be.an('string')
        .to.equal('No authorization header included');
    expect(res.body)
        .to.have.property('code')
        .to.be.a('number')
        .to.equal(401);

    done();
}

function wrongAuthHeader(res, done, err) {
    if (err) {
        done();
    }
    expect(res).to.exist;
    expect(res).to.have.status(401);
    expect(res.body)
        .to.have.property('message')
        .to.be.an('string')
        .to.equal('Not authorized');
    expect(res.body)
        .to.have.property('code')
        .to.be.a('number')
        .to.equal(401);

    done();
}

function returnsObject(res, done, err) {
    if (err) {
        console.warn(err);
        done();
    }
    expect(res).to.exist;
    expect(res).to.have.status(200);
    expect(res.body)
        .to.have.property('result')
        .to.be.a('object');
    done();
}

function returnsArray(res, done, err) {
    if (err) {
        console.warn(err);
        done();
    }
    expect(res).to.exist;
    expect(res).to.have.status(200);
    expect(res.body)
        .to.have.property('result')
        .to.be.a('array');
    done();
}


describe("API comments endpoints", () => {
    let createdUser;
    let createdThread;
    let createdComment;

    beforeEach((done) => {
       createdUser = new User({
           name: username,
           password: password
       });

       createdUser.save()
           .then(() => User.findOne({name: username}))
           .then((u) => {
              createdThread = new Thread({
                  title: "Thread for comments api tests",
                  content: "Testing...",
                  author: u
              });
              createdUser = u;
              createdThread.save()
                  .then(() => Thread.findOne({title: "Thread for comments api tests", content: "Testing...", author: u._id}))
                  .then((t) => {
                      createdThread = t;

                      createdComment = new Comment({
                          content: "This is the test comment for the api tests",
                          author: u,
                          thread: t
                      });

                      createdComment.save()
                          .then(() => Comment.findOne({author: u._id, thread: t._id, content: "This is the test comment for the api tests"}))
                          .then((c) => {
                              createdComment = c;
                              done();
                          });
                  })
           });
    });

    /**
     * all the tests with no auth
     */

    it('should not be able to give all comments without auth header', (done) => {
       chai
           .request(server)
           .get('/api/comments')
           .set('Content-Type', 'application/json')
           .end((err, res) => {
               noAuthorizationHeader(res, done, err);
           });
    });


    it('should not be able to give a comment by id without auth header', (done) => {
        chai
            .request(server)
            .get('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to create a comment without auth header', (done) => {
        const comment = {
            content: "Should not be added",
            thread: createdThread
        };
        chai
            .request(server)
            .post('/api/comments')
            .set('Content-Type', 'application/json')
            .send(comment)
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to update a comment without auth header', (done) => {
        const comment = {
            content: "Should not be updated"
        };
        chai
            .request(server)
            .put('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .send(comment)
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to add an upvote to a comment without auth header', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/upvote")
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to add a downvote to a comment without auth header', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/downvote")
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to add a comment to a comment without auth header', (done) => {
        const comment = {
            content: "Comment 2 comment test"
        };
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/comment")
            .set('Content-Type', 'application/json')
            .send(comment)
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('should not be able to delete a comment without auth header', (done) => {
        chai
            .request(server)
            .delete('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    /**
     * all the tests with incorrect auth
     */

    it('should not be able to give all comments with incorrect auth header', (done) => {
        chai
            .request(server)
            .get('/api/comments')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });


    it('should not be able to give a comment by id with incorrect auth header', (done) => {
        chai
            .request(server)
            .get('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to create a comment with incorrect auth header', (done) => {
        const comment = {
            content: "Should not be added",
            thread: createdThread
        };
        chai
            .request(server)
            .post('/api/comments')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .set('Authorization', 'Bearer ' + token)
            .send(comment)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to update a comment with incorrect auth header', (done) => {
        const comment = {
            content: "Should not be updated"
        };
        chai
            .request(server)
            .put('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(comment)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to add an upvote to a comment with incorrect auth header', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/upvote")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to add a downvote to a comment with incorrect auth header', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/downvote")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to add a comment to a comment with incorrect auth header', (done) => {
        const comment = {
            content: "Comment 2 comment test"
        };
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/comment")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(comment)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });

    it('should not be able to delete a comment with incorrect auth header', (done) => {
        chai
            .request(server)
            .delete('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                wrongAuthHeader(res, done, err);
            });
    });


    /**
     * all the tests with array as return value
     */

    it('should return an array of comments', (done) => {
        chai
            .request(server)
            .get('/api/comments')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .end((err, res) => {
                returnsArray(res, done, err);
            });
    });

    /**
     * all the tests with object as return value
     */

    it('should return an object with one comment', (done) => {
        chai
            .request(server)
            .get('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should return an object with the updated comments', (done) => {
        const comment = {
          content: "API comment content update test"
        };

        chai
            .request(server)
            .put('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .send(comment)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should return the just created comment as object', (done) => {
        const comment = {
          thread: createdThread,
          content: "Correct created comment with api tests"
        };

        chai
            .request(server)
            .post('/api/comments')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .send(comment)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should return the just deleted comment as object', (done) => {
        chai
            .request(server)
            .delete('/api/comments/' + createdComment._id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should add an upvote to the comment and return the newest version of the comment', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/upvote")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should add a downvote to the comment and return the newest version of the comment', (done) => {
        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/downvote")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });

    it('should add a comment to the comment and return the newest version of the comment', (done) => {
        const comment = {
          content: "Just created comment to this comment"
        };

        chai
            .request(server)
            .post('/api/comments/' + createdComment._id + "/comment")
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + correctToken)
            .send(comment)
            .end((err, res) => {
                returnsObject(res, done, err);
            });
    });
});
