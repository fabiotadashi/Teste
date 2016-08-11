'use strict';

// #######################################
// NPM MODULES
// #######################################

let nconf = require('nconf'),
    app   = require('./config/express.js');

// #######################################
// INIT
// #######################################

const LOGGER = require('./config/logger.js');
const APP_PORT = nconf.get('app:port');

app.listen(APP_PORT, () => {
  LOGGER.info('Server has been started at port: ' + APP_PORT);
  
});