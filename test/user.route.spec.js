'use strict';

// #######################################
// SPECS MODULES
// #######################################

let request = require('supertest');
let should = require('chai').should();

// #######################################
// LOCAL MODULES
// #######################################

let app          = require('../../config/express'),
    authenticate = require('../test/authenticate.js');

let Scenario     = require('../builders/builder.js');

// #######################################
// TESTS
// #######################################

describe('User', () => {

  beforeEach((done) => {
    Scenario.clearDB().then(done);
  });

  describe('admin listing', () => {

    it('default paged default ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let admin = scenario.admin('rafael', redspark);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .set('Authorization', authenticate(app, admin))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(8);
              res.body.total.should.equal(8);
              res.body.docs[0].name.should.equal('beck');
              res.body.docs[7].name.should.equal('renato');

              for (let i = 0; i < 8; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });

    it('custom paged custom ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let admin = scenario.admin('rafael', redspark);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ page: 1, limit: 5, sort: '-name' })
            .set('Authorization', authenticate(app, admin))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(5);
              res.body.total.should.equal(8);
              res.body.docs[0].name.should.equal('renato');
              res.body.docs[4].name.should.equal('ianek');

              for (let i = 0; i < 5; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });

    it('fitered by department', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let admin = scenario.admin('rafael', redspark);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ department: fiscal._id.toString() })
            .set('Authorization', authenticate(app, admin))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(4);
              res.body.total.should.equal(4);
              res.body.docs[0].name.should.equal('carlos');
              res.body.docs[3].name.should.equal('renato');

              for (let i = 0; i < 4; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });
  });

  describe('manager listing', () => {

    it('default paged default ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.manager('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(5);
              res.body.total.should.equal(5);
              res.body.docs[0].name.should.equal('carlos');
              res.body.docs[4].name.should.equal('renato');

              for (let i = 0; i < 5; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });

    it('custom paged custom ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.manager('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ page: 1, limit: 2, sort: '-name' })
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(2);
              res.body.total.should.equal(5);
              res.body.docs[0].name.should.equal('renato');
              res.body.docs[1].name.should.equal('rafael');

              for (let i = 0; i < 2; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });

    it('fitered by department', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let admin = scenario.manager('rafael', redspark, fiscal, legal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ department: fiscal._id.toString() })
            .set('Authorization', authenticate(app, admin))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(5);
              res.body.total.should.equal(5);
              res.body.docs[0].name.should.equal('carlos');
              res.body.docs[4].name.should.equal('renato');

              for (let i = 0; i < 5; i++) {
                res.body.docs[i].should.have.property('_id');
                res.body.docs[i].should.have.property('name');
              }
            })
            .end(done);
        });
    });

    it('fitered by invalid department (403)', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.manager('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ department: legal._id.toString() })
            .set('Authorization', authenticate(app, user))
            .expect(403)
            .end(done);
        });
    });
  });

  describe('user listing', () => {

    it('default paged default ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.user('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(1);
              res.body.total.should.equal(1);
              res.body.docs[0].name.should.equal('rafael');
              res.body.docs[0].should.have.property('_id');
              res.body.docs[0].should.have.property('name');
            })
            .end(done);
        });
    });

    it('custom paged custom ordered', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.user('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ page: 1, limit: 2, sort: '-name' })
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(1);
              res.body.total.should.equal(1);
              res.body.docs[0].name.should.equal('rafael');
              res.body.docs[0].should.have.property('_id');
              res.body.docs[0].should.have.property('name');
            })
            .end(done);
        });
    });

    it('fitered by department', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.user('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ department: fiscal._id.toString() })
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect('Content-Type', /json/)
            .expect((res) => {
              res.body.docs.should.have.length(1);
              res.body.total.should.equal(1);
              res.body.docs[0].name.should.equal('rafael');
              res.body.docs[0].should.have.property('_id');
            })
            .end(done);
        });
    });

    it('fitered by invalid department (403)', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let legal = scenario.department('legal', redspark);
      let user = scenario.user('rafael', redspark, fiscal);
      scenario.users(redspark, fiscal, 'juliano', 'lucas', 'carlos', 'renato');
      scenario.users(redspark, legal, 'beck', 'gilberto', 'ianek');

      scenario.build()
        .then(() => {
          request(app)
            .get('/user')
            .query({ department: legal._id.toString() })
            .set('Authorization', authenticate(app, user))
            .expect(403)
            .end(done);
        });
    });
  });

  describe('me', () => {

    it('should return user data', (done) => {
      let scenario = new Scenario();
      let redspark = scenario.company('redspark');
      let fiscal = scenario.department('fiscal', redspark);
      let user = scenario.user('rafael', redspark, fiscal);

      scenario.build()
        .then(() => {
          request(app)
            .get('/user/me')
            .set('Authorization', authenticate(app, user))
            .expect(200)
            .expect((res) => {
              res.body.name.should.equal(user.name);
              res.body._id.should.equal(user._id.toString());
              should.not.exist(res.body.password);
            })
            .end(done);
        });
    });

    it('when user not signed (401)', (done) => {
      request(app)
        .get('/user/me')
        .expect(401, done);
    });
  });
});