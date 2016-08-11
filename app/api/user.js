'use strict';

const LOGGER   = require('../../config/logger.js');

let models = require('../model');
let User = models.User;

let api = (app) => {
  app.get('/users', (req, res) => {
    User.findAll().then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        LOGGER.error(err);
        res.sendStatus(500);
      });
  });
};

module.exports = api;