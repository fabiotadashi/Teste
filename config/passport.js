'use strict';

// #######################################
// NPM MODULES
// #######################################

let passport  = require('passport');

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;

let Model = require('../app/model').User;

// #######################################
// CONFIG
// #######################################

module.exports = (secret) => {
  let opts = { 
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      secretOrKey   : secret
    };

  passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
      model.findOne({ id: jwt_payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) done(null, user);
        else done(null, false);
      }).lean();
    }
  ));
};