const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');
const expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

const friendname = 'luccie12';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiaGVua2llMTIiLCJpZCI6IjVkZDQyN2IwZDZiMzQ1MDZlOGEwNWE1NiJ9LCJpYXQiOjE1NzQxODUxMzEsImV4cCI6MTU3NDI3MTUzMX0.n4LC9ZRM6drT3_0JHOn4s2I_BNai69o_Q9vYzrjarg8';
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibGFyc2llMTIiLCJpZCI6IjVkZDQ0MTgxZTI4ZmE3NDFmNDhmZWNhYSJ9LCJpYXQiOjE1NzQxOTE1MDAsImV4cCI6MTU3NDI3NzkwMH0.c-ybpsos7Kf5um5bf0JI-xA07nOChwasZVrbc2jjlbo';

describe('Friendship API endpoints', () => {
  beforeEach(done => {
    // runs before each test in this block

    chai
      .request(server)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        name: 'henkie12',
        password: 'Test1234',
        active: true
      })
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

        chai
          .request(server)
          .post('/api/users')
          .set('Content-Type', 'application/json')
          .send({
            name: 'luccie12',
            password: 'Test1234',
            active: true
          })
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
  });

  afterEach(() => {

  })

  it('Should be able to create a friendship', done => {
    chai
      .request(server)
      .post('/api/friendships')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        friendname: friendname
      })
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(201);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.equal('Created successfully a new friendship!');
        done();
      });
  });

  it('Should not be able to create a friendship if user does not exist in mongoDB', done => {
    chai
      .request(server)
      .post('/api/friendships')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token2)
      .send({
        friendname: friendname
      })
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(404);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.equal('User was not found!');
        done();
      });
  });

  it('Should be not be able to create a friendship if friendname is undefined', done => {
    chai
      .request(server)
      .post('/api/friendships')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(409);
        expect(res.body)
          .to.have.property('error')
          .to.be.a('string')
          .to.equal("Username or friend's username missing!");
        done();
      });
  });

  it('Should not be able to create a friendship without Authorization header', done => {
    chai
      .request(server)
      .post('/api/friendships')
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

  it('Should not be able to create a friendship with invalid token', done => {
    chai
      .request(server)
      .post('/api/friendships')
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

  it('Should be able to delete a friendship', done => {
    chai
    .request(server)
    .delete('/api/friendships')
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + token)
    .send({
      friendname: friendname
    })
    .end((err, res) => {
      if (err) {
        done();
      }
      expect(res).to.exist;
      expect(res).to.have.status(200);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('string')
        .to.equal('Friendship successfully deleted!');
      done();
    });
  });

  it('Should be not be able to delete a friendship if friendname is undefined', done => {
    chai
      .request(server)
      .delete('/api/friendships')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        if (err) {
          done();
        }
        expect(res).to.exist;
        expect(res).to.have.status(409);
        expect(res.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.equal("friend was not found");
        done();
      });
  });

  it('Should not be able to delete a friendship without Authorization header', done => {
    chai
      .request(server)
      .delete('/api/friendships')
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

  it('Should not be able to delete a friendship with invalid token', done => {
    chai
      .request(server)
      .delete('/api/friendships')
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
