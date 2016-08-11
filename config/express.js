'use strict';

// #######################################
// NPM MODULES
// #######################################

let express   = require('express'),
  nconf       = require('nconf'),
  consign     = require('consign'),
  bodyParser  = require('body-parser');

// #######################################
// CONFIG INIT
// #######################################

const LOGGER = require('./logger.js');

let properties = process.env.PROPERTIES || './config/env/dev.json';
LOGGER.info(properties);

nconf
  .argv()
  .env({separator:'__'})
  .file(properties);

let secret = nconf.get('jwt:secret');

// #######################################
// LOCAL MODULES
// #######################################

const APP = require('./const.js');

// #######################################
// INIT
// #######################################

let app = express();

app.set('secret', secret);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign({ cwd: 'app' })
  .then('api/auth.js')
  .then('api')
  //.exclude('api/validation')
  //.exclude('api/role-filter')
  .into(app);

// this module use model inside, so before use, model must be initalized
require('./passport.js')(secret);

app.disable('x-powered-by');

module.exports = app;