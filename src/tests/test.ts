import {default as chai} from 'chai';
import {default as chaiHttp} from 'chai-http';
import { ResCodes } from '../interfaces/enums';
import { server } from '../server'
const should = chai.should();
const newUser = {
  username: "Test",
  age: 69,
  hobbies: ['Testing', 'Resting']
}


chai.use(chaiHttp);

describe("Correct app work", () => {
    describe('/GET users', () => {
        it('Get all the users, expected empty arr', done => {
          chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(ResCodes.CORRECT_CODE);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
        });
      });

    describe('/POST new user', () => {
      it('Post new user, expected new user', done => {
        chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(ResCodes.CORRECT_CREATE_CODE);
          res.body.should.be.a(typeof newUser);
          res.body.should.have.property('username');
          res.body.should.have.property('age');
          res.body.should.have.property('hobbies');
          res.body.should.have.property('id');
          done();
        })
      })
    })

    describe('/GET new user', () => {
      it('Get new user by id, expected new user', done => {
        let newId = '';
        chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(ResCodes.CORRECT_CREATE_CODE);
          res.body.should.be.a(typeof newUser);
          newId = res.body.id;
          
          chai.request(server)
          .get(`/api/users/${newId}`)
          .end((err, res) => {
            res.should.have.status(ResCodes.CORRECT_CODE);
            res.body.should.be.a(typeof newUser);
            res.body.should.have.property('username');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            res.body.should.have.property('id');
            res.body.id.should.be.eql(newId);
            done();
        })
        });
      })
    })


    describe('/PUT new user info', () => {
      it('Update new user by id, expected new user-data', done => {
        let newId = '';
        chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(ResCodes.CORRECT_CREATE_CODE);
          res.body.should.be.a(typeof newUser);
          newId = res.body.id;
          
          chai.request(server)
          .put(`/api/users/${newId}`)
          .send({age: 42})
          .end((err, res) => {
            res.should.have.status(ResCodes.CORRECT_CODE);
            res.body.should.be.a(typeof newUser);
            res.body.should.have.property('username');
            res.body.should.have.property('age');
            res.body.should.have.property('hobbies');
            res.body.should.have.property('id');
            res.body.id.should.be.eql(newId);
            res.body.age.should.be.eql(42);
            done();
        })
        });
      })
    })

    describe('/DELETE new user ', () => {
      it('Delete new user by id, expected 404 status on get-request', done => {
        let newId = '';
        chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(ResCodes.CORRECT_CREATE_CODE);
          res.body.should.be.a(typeof newUser);
          newId = res.body.id;
          
          chai.request(server)
          .delete(`/api/users/${newId}`)
          .end((err, res) => {
            res.should.have.status(ResCodes.CORRECT_DELETE_CODE);
            
            chai.request(server)
            .get(`/api/users/${newId}`)
            .end((err, res) => {
              res.should.have.status(ResCodes.NOT_FOUND_CODE);
              done();
            })
        })
        });
      })
    })
  })

describe('Search-related errors', () => {
  describe('Non existent id search, expected 404 status', () => {
  it('Search for non existent user', done => {
    chai.request(server)
    .get(`/api/users/cf7ba368-ed72-4094-b2c7-504c4a180505`)
    .end((err, res) => {
      res.should.have.status(ResCodes.NOT_FOUND_CODE);
      done();
    })
  })
})

describe('Incorrect id search', () => {
  it('Search for incorrect user-id, expected 400 status', done => {
    chai.request(server)
    .get(`/api/users/c1212`)
    .end((err, res) => {
      res.should.have.status(ResCodes.USER_ERROR_CODE);
      done();
    })
  })
})})

describe('Request-related errors', () => {
  describe('Incorrect request body', () => {
    it('Create incorrect request, expected 400 status', done => {
      chai.request(server)
      .post(`/api/users`)
      .send({test: 131231})
      .end((err, res) => {
        res.should.have.status(ResCodes.USER_ERROR_CODE);
        done();
      })
    })
  })

  describe('Request to non-existent endpoint', () => {
    it('Non existent endpoint, expected 404 status', done => {
      chai.request(server)
      .get('/api/test')
      .end((err, res) => {
        res.should.have.status(ResCodes.NOT_FOUND_CODE);
        done();
    })
  })
 })
})