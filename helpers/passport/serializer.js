const { User } = require('../../models');

async function serializeUser(user, done) {
  done(null, user.id);
}

async function deserializeUser(id, done) {
  const user = await User.findOne({
    attributes: {
      exclude: ['password']
    }, where: { id: id }
  });
  if (user) return done(null, user);

  done(new Error('Fail To Deserialize User : 계정 정보가 존재하지 않습니다.'), null);
}

module.exports = {
  serializeUser,
  deserializeUser
};
