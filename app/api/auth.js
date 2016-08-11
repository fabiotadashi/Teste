'use strict';

// #######################################
// NPM MODULES
// #######################################

let jwt      = require('jsonwebtoken'),
    passport = require('passport'),
    validate = require('express-validation'),
    bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q');

let Model = require('../model').User;
let validation = require('./validation');

// #######################################
// LOCAL MODULES
// #######################################

const LOGGER = require('../../config/logger.js');

let api = (app) => {

  app.post('/login', validate(validation.login), (req, res) => {

    Model.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          LOGGER.warn('user not found or invalid password');
          res.sendStatus(401);
        } else {
          Q.nfbind(bcrypt.compare)(req.body.password, user.password).then((result) => {
            if (result === true) {
              LOGGER.info(`user authenticated: ${user.name}`);

              let token = jwt.sign({ id: user.id, createdAt: user.createdAt }, app.get('secret'), { expiresIn: 84600 });
              res.set('Authorization', `JWT ${token}`).end();
            } else {
              LOGGER.warn('user not found or invalid password');
              res.sendStatus(401);
            }
          }).catch((err) => {
            LOGGER.error(err);
            res.sendStatus(401);
          });
        }
      }).catch((err) => {
        LOGGER.error(err);
        res.sendStatus(401);
      });
  });

  app.use('/*', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
      next();
    }
  );
};

module.exports = api;