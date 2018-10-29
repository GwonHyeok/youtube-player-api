const LocalStrategy = require('./strategy/local');
const HttpBearerStrategy = require('./strategy/bearer');
const AnonymousStrategy = require('passport-anonymous');

const Serializer = require('./serializer');
const passport = require('passport');

function setup(app) {
  app.use(passport.initialize());
  passport.use(new LocalStrategy());
  passport.use(new HttpBearerStrategy());
  passport.use(new AnonymousStrategy());
  passport.serializeUser(Serializer.serializeUser);
  passport.deserializeUser(Serializer.deserializeUser);
}

module.exports = {
  setup
};
