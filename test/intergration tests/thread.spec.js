const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);


const thread_id = "5dc82606c989ba0e10accca3";
const username = 'TestUser404';
const password = '8080751807';

let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9lIiwiaWQiOiI1ZGM4MjYwNmM5ODliYTBlMTBhY2NjYTEifSwiaWF0IjoxNTc0MTA0MTMxLCJleHAiOjE1NzQxOTA1MzF9.jHCzX90v3yLW2Ga0R6FyhTHPYhoSi3IIRr9T6XXFf9E';

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


describe('API thread endpoints', () => {

   it('Should not get any threads without an authorization header', (done) => {
       chai
           .request(server)
           .get('/api/threads')
           .set('Content-Type', 'application/json')
           .end((err, res) => {
               noAuthorizationHeader(res, done, err);
           });
   });

   it('Should not create a new thread without an authorization header', (done) => {
       const thread = {
         title: "Not working",
         content: "It should not be able to do this"
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

   it('Should not get a thread by id without an auth header', (done) => {
       chai
           .request(server)
           .get('/api/threads/' + thread_id)
           .set('Content-Type', 'application/json')
           .end((err, res) => {
               noAuthorizationHeader(res, done, err);
           });
   });

   it('Should not be able to update a thread without an authorization header', (done) => {
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

    it('Should not be able to add upvote to a thread without an authorization header', (done) => {
        chai
            .request(server)
            .post('/api/threads/' + thread_id + "/upvote")
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('Should not be able to add downvote to a thread without an authorization header', (done) => {
        chai
            .request(server)
            .post('/api/threads/' + thread_id + "/downvote")
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });


    it('Should not be able to add a comment to a thread without an authorization header', (done) => {
        const comment = {
          content: "This should not be added"
        };
        chai
            .request(server)
            .post('/api/threads/' + thread_id + "/comment")
            .set('Content-Type', 'application/json')
            .send(comment)
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });

    it('Should not be able to delete a thread without an authorization header', (done) => {
        chai
            .request(server)
            .delete('/api/threads/' + thread_id)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                noAuthorizationHeader(res, done, err);
            });
    });
});
