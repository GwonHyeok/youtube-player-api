'use strict';
const express = require('express');
const router = express.Router();
const passport = require('passport');
const asyncHandler = require('../helpers/asyncHandler');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const { AccessToken } = require('../models');

router.post('/', passport.authenticate(['local']), asyncHandler(async function(request, response) {

  // Encode Token
  const token = jwt.sign({ id: request.user.id }, config.jwtSecretKey);

  // Create Access Token
  const accessToken = await AccessToken.create({ UserId: request.user.id, token });

  // Bearer
  response.json({
    data: {
      type: 'Bearer',
      token: accessToken.token
    }
  });
}));

module.exports = router;
