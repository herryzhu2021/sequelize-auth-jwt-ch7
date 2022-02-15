const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { User } = require("../models");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


async function authenticate(username, password, done) {
  try {
    const user = await User.authenticate({ username, password });
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
}

const options = {
  // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
  jwtFromRequest: (req, res) => {
      const token = req.cookies.token;
      return token;
  },
  secretOrKey: 'Ini rahasia',
}
passport.use(new JwtStrategy(options, async (payload, done) => {
  User.findByPk(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))

module.exports = passport;
