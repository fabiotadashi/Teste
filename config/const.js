'use strict';

// #######################################
// NPM MODULES
// #######################################

let nconf = require('nconf');

// #######################################
// CONFIG INIT
// #######################################

/* MySqlConfig
const HOST           = nconf.get('mongo:host'),
      DATABASE       = nconf.get('mongo:database'),
      DATABASE_AUDIT = nconf.get('mongo:database_audit');

let mongoUrl = `mongodb://${HOST}`;
*/

module.exports = {

  DEV               : 'dev',
  QA                : 'qa',
  PROD              : 'prod',

/*
  DATABASE          : DATABASE,
  DATABASE_AUDIT    : DATABASE_AUDIT,

  HOST              : HOST,
  MONGODB_URL       : `${mongoUrl}/${DATABASE}`,
  MONGODB_AUDIT_URL : `${mongoUrl}/${DATABASE_AUDIT}`
*/
};