const HttpBearerStrategyInterface = require('passport-http-bearer').Strategy;
const { User, AccessTokens } = require('../../../models');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config/config.js')[env];

class LocalStrategy extends HttpBearerStrategyInterface {
  constructor() {
    super(async function(token, done) {
      try {
        const isVerified = jwt.verify(token, config.jwtSecretKey);
        if (!isVerified) return done(new Error('옳바르지 않은 토큰 입니다'));

        // Access Token
        const accessToken = await AccessTokens.findOne({ where: { token } });
        if (!accessToken) return done(new Error('인증 정보가 없습니다'));

        // User
        const user = await User.findOne({ where: { id: accessToken.userId } });
        return done(null, user);
      } catch (e) {
        return done(e)
      }
    });
  }
}


module.exports = LocalStrategy;
