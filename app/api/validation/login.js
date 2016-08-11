'use strict';

let Joi = require('joi');

module.exports = {
  options: { allowUnknownBody: false },
  body: {
    email   : Joi.string().email().required(),
    password: Joi.string().required()
  }
};