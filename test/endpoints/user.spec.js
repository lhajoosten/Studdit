const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const jwt = require('jsonwebtoken');
const expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

const username = 'TestUser404';
const password = '8080751807';

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSm9lIiwiaWQiOiI1ZGM4MjYwNmM5ODliYTBlMTBhY2NjYTEifSwiaWF0IjoxNTc0MTA0MTMxLCJleHAiOjE1NzQxOTA1MzF9.jHCzX90v3yLW2Ga0R6FyhTHPYhoSi3IIRr9T6XXFf9E';

describe('API User endpoints', () => {
  it('Should not get all users without Authorization header', done => {
    chai
      .request(server)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
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
      });
  });

  it('Should not get all users without correct token', done => {
    chai
      .request(server)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + '')
      .end((err, res) => {
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
      });
  });

  it('Should get all users with correct token', done => {
    chai
      .request(server)
      .get('/api/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');

        done();
      });
  });

  it('Should creat new user', done => {
    const user = {
      name: username,
      password: password
    };
    chai
      .request(server)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send(user)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property('message')
          .to.be.an('string')
          .to.equal('Created new user successfully');
        expect(res.body)
          .to.have.property('code')
          .to.be.a('number')
          .to.equal(201);
        done();
      });
  });

  it('Should be able to get user by name', done => {
    chai
      .request(server)
      .get('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should not be able to get user by name without Authorization header', done => {
    chai
      .request(server)
      .get('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
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
      });
  });

  it('Should not be able to get user by name without valid token', done => {
    chai
      .request(server)
      .get('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + '')
      .end((err, res) => {
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
      });
  });

  it('Should be able to update user by name', done => {
    chai
      .request(server)
      .put('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
          name: username,
          password: 'Testing123!',
          active: true
      })
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should not be able to update user by name without Authorization header', done => {
    chai
      .request(server)
      .put('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
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
      });
  });

  it('Should not be able to update user by name without valid token', done => {
    chai
      .request(server)
      .put('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + '')
      .end((err, res) => {
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
      });
  });

  it('Should be able to delete user by name', done => {
    chai
      .request(server)
      .delete('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should not be able to delete user by name without Authorization header', done => {
    chai
      .request(server)
      .delete('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
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
      });
  });

  it('Should not be able to delete user by name without valid token', done => {
    chai
      .request(server)
      .delete('/api/users/' + username)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + '')
      .end((err, res) => {
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
      });
  });
});
