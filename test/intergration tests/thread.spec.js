const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;
const Thread = require('../../src/models/threads-model');
const User = require('../../src/models/users-model');

chai.should();
chai.use(chaiHttp);

const thread_id = '5dc82606c989ba0e10accca3';
const username = 'TestUser404';
const password = '8080751807';

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9lIiwiaWQiOiI1ZGM4MjYwNmM5ODliYTBlMTBhY2NjYTEifSwiaWF0IjoxNTc0MTA0MTMxLCJleHAiOjE1NzQxOTA1MzF9.jHCzX90v3yLW2Ga0R6FyhTHPYhoSi3IIRr9T6XXFf9E';

let correctToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiaGVua2llMTIiLCJpZCI6IjVkZDQyN2IwZDZiMzQ1MDZlOGEwNWE1NiJ9LCJpYXQiOjE1NzQxODUxMzEsImV4cCI6MTU3NDI3MTUzMX0.n4LC9ZRM6drT3_0JHOn4s2I_BNai69o_Q9vYzrjarg8';

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

describe('API thread endpoints', () => {
  let createdThread;
  let createdUser;

  beforeEach(done => {
    createdUser = new User({
      name: username,
      password: password
    });

    createdUser
      .save()
      .then(() => User.findOne({ name: username }))
      .then(u => {
        createdUser = u;
        createdThread = new Thread({
          title: 'Test thread for api endpoints',
          content: 'Lorem ipsummmmmm',
          author: u
        });

        createdThread
          .save()
          .then(() =>
            Thread.findOne({
              title: 'Test thread for api endpoints',
              content: 'Lorem ipsummmmmm'
            })
          )
          .then(t => {
            createdThread = t;
            done();
          });
      });
  });

  /*
   * all the no auth tests
   *
   *
   *
   */
  it('Should not get any threads without an authorization header', done => {
    chai
      .request(server)
      .get('/api/threads')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not create a new thread without an authorization header', done => {
    const thread = {
      title: 'Not working',
      content: 'It should not be able to do this'
    };
    chai
      .request(server)
      .post('/api/threads')
      .set('Content-Type', 'application/json')
      .send(thread)
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not get a thread by id without an auth header', done => {
    chai
      .request(server)
      .get('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not be able to update a thread without an authorization header', done => {
    const thread = {
      title: "Can't update thread"
    };
    chai
      .request(server)
      .put('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .send(thread)
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not be able to add upvote to a thread without an authorization header', done => {
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/upvote')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not be able to add downvote to a thread without an authorization header', done => {
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/downvote')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not be able to add a comment to a thread without an authorization header', done => {
    const comment = {
      content: 'This should not be added'
    };
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/comment')
      .set('Content-Type', 'application/json')
      .send(comment)
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  it('Should not be able to delete a thread without an authorization header', done => {
    chai
      .request(server)
      .delete('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        noAuthorizationHeader(res, done, err);
      });
  });

  /*
   * All the incorrect auth header tests
   *
   *
   *
   */
  it('Should not get any threads with an incorrect authorization header', done => {
    chai
      .request(server)
      .get('/api/threads')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not create a new thread with an incorrect authorization header', done => {
    const thread = {
      title: 'Not working',
      content: 'It should not be able to do this'
    };
    chai
      .request(server)
      .post('/api/threads')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(thread)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not get a thread by id with an incorrect authorization header', done => {
    chai
      .request(server)
      .get('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not be able to update a thread with an incorrect authorization header', done => {
    const thread = {
      title: "Can't update thread"
    };
    chai
      .request(server)
      .put('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(thread)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not be able to add upvote to a thread with an incorrect authorization header', done => {
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/upvote')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not be able to add downvote to a thread with an incorrect authorization header', done => {
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/downvote')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not be able to add a comment to a thread with an incorrect authorization header', done => {
    const comment = {
      content: 'This should not be added'
    };
    chai
      .request(server)
      .post('/api/threads/' + thread_id + '/comment')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send(comment)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  it('Should not be able to delete a thread with an incorrect authorization header', done => {
    chai
      .request(server)
      .delete('/api/threads/' + thread_id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        wrongAuthHeader(res, done, err);
      });
  });

  /**
   * All the return object tests
   */
  it('should get an object by thread id', done => {
    chai
      .request(server)
      .get('/api/threads/' + createdThread._id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should create a new thread', done => {
    const thread = {
      title: 'Should create this thread!!',
      content: 'I think it will'
    };
    chai
      .request(server)
      .post('/api/threads')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .send(thread)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should update a thread by id', done => {
    const thread = {
      title: 'This is going to be updated by the chai test'
    };
    chai
      .request(server)
      .put('/api/threads/' + createdThread._id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .send(thread)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should add a upvote to a thread by id', done => {
    chai
      .request(server)
      .post('/api/threads/' + createdThread._id + '/upvote')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should add a comment to a thread by id', done => {
    const comment = {
      content: 'This comment is added by the chai test'
    };
    chai
      .request(server)
      .post('/api/threads/' + createdThread._id + '/comment')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .send(comment)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should add a downvote to a thread by id', done => {
    chai
      .request(server)
      .post('/api/threads/' + createdThread._id + '/downvote')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  it('should delete a thread by id', done => {
    chai
      .request(server)
      .delete('/api/threads/' + createdThread._id)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .end((err, res) => {
        returnsObject(res, done, err);
      });
  });

  /**
   * return test with array
   */

  it('should return an array of all threads', done => {
    chai
      .request(server)
      .get('/api/threads')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + correctToken)
      .end((err, res) => {
        returnsArray(res, done, err);
      });
  });
});
