// eslint-disable-next-line no-unused-vars
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const User = mongoose.model('users')
// eslint-disable-next-line no-unused-vars
const keys = require('./keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'

module.exports = passport => {
  // eslint-disable-next-line camelcase
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
    User.findById(jwt_payload.id).then((user) => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }).catch((err) => {
      console.log(err)
    })
  }))
}
