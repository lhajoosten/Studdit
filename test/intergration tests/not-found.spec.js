const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/index.js');

chai.should();
chai.use(chaiHttp);

describe('Endpoint not found', () => {
  it('Should return not found 404 - GET(`/api/login/user`) ', done => {
    chai
      .request(server)
      .get('/api/login/user')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - GET(`/ai/users`)', done => {
    chai
      .request(server)
      .get('/ai/users')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - GET(`/`)', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - POST(`/`)', done => {
    chai
      .request(server)
      .post('/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - POST(`/api/users/1`)', done => {
    chai
      .request(server)
      .post('/api/user/1')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - POST(`/api/comment`)', done => {
    chai
      .request(server)
      .post('/api/comment')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - PUT(`/api/friendships`)', done => {
    chai
      .request(server)
      .put('/api/friendships')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - PUT(`/api/users`)', done => {
    chai
      .request(server)
      .put('/api/users')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - PUT(`/api/comments`)', done => {
    chai
      .request(server)
      .put('/api/comments')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - DELETE(`/api/friendships/1`)', done => {
    chai
      .request(server)
      .delete('/api/friendships/1')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - DELETE(`/api/users`)', done => {
    chai
      .request(server)
      .delete('/api/users')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - DELETE(`/api/comments`)', done => {
    chai
      .request(server)
      .delete('/api/comments')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - PATCH(`/api/users`)', done => {
    chai
      .request(server)
      .patch('/api/users')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });

  it('Should return not found 404 - PATCH(`/api/threads`)', done => {
    chai
      .request(server)
      .patch('/api/threads')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .eql('Endpoint does not exist!');
        res.body.should.have.property('code').eql(404);
        done();
      });
  });
});
