const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); // Replace with the actual path to your server file

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Authentication API', () => {
  // Test registration endpoint
  describe('POST /api/v1/users/register', () => {
    it('should register a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
          role: 'user',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('User registered successfully');
          done();
        });
    });

  });

  describe('POST /api/v1/users/login', () => {
    it('should log in a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });

  });

  describe('GET /api/v1/users/current-user', () => {
    it('should get the current user with valid token', (done) => {
      // Perform login to get the token
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .end((loginErr, loginRes) => {
          // Use the token for authentication
          chai
            .request(app)
            .get('/api/v1/users/current-user')
            .set('Authorization', `Bearer ${loginRes.body.token}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              // Add more assertions based on your authentication logic
              done();
            });
        });
    });

    // Add more tests for edge cases, invalid tokens, etc.
  });
});

