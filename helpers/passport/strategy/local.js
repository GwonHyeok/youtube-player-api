const LocalStrategyInterface = require('passport-local').Strategy;
const { User } = require('../../../models');

class LocalStrategy extends LocalStrategyInterface {
  constructor() {

    super(async function(username, password, done) {
      const user = await User.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'username' });

      // 비밀번호가 틀릴경우
      const isVerifiedPassword = await user.verifyPassword(password);
      if (!isVerifiedPassword) return done(null, false, { message: 'password' });

      return done(null, user);
    });
  }
}


module.exports = LocalStrategy;
