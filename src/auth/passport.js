const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { UserService } = require('../dal/services');
const hasher = require('./hasher');
const appConfig = require('../config');

// Auth Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const [user] = await UserService.findOne(username);
      if (!user || !hasher.compare(password, user.passwd)) {
        return done(null, false);
      }
      return done(null, { username: user.username, id: user.id });
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = appConfig.jwt.secret;

passport.use(
  new JwtStrategy(opts, ((jwtPayload, done) => {
    done(null, jwtPayload);
  })),
);

module.exports = passport;
