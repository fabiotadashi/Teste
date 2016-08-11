'use strict';

// #######################################
// NPM MODULES
// #######################################

let winston    = require('winston'),
    morgan     = require("morgan"),
    nconf      = require('nconf'),
    ip         = require('ip'),
    logentries = require('winston-logentries');

winston.level = process.env.LOG_LEVEL;

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level             : 'info',
            filename          : './anestech.log',
            handleExceptions  : true,
            json              : true,
            maxsize           : 5242880, //5MB
            maxFiles          : 5,
            colorize          : false,
            prettyPrint       : true
        }),
        new winston.transports.Console({
            level             : 'info',
            handleExceptions  : true,
            json              : false,
            colorize          : true,
            prettyPrint       : true
        }),
        new winston.transports.Logentries({token: nconf.get('logentries:token')})
    ],
    exitOnError: false
});

logger.stream = {
    write: (message) => {
        logger.info(message);
    }
};

morgan.token('ip', () => {
    return ip.address();
} );
morgan.token('params', function (req) {
  return req.body ? JSON.stringify(req.body) : req.params ? req.params : req.query;
});

let format = "[:ip] :: :date[clf] - [:method :: :url :: :status :: :req[content-type]] params=:params time=:response-time ms :remote-addr";
logger.morgan = morgan(format, { "stream": logger.stream });

module.exports = logger;