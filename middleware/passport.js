const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const User = require('../models/User')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT_SECRET
}

module.exports = passport=> {
  passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.userId).select('email id')
      if(user) {
        return done(null, user)
      }
      return done(null, false)
    } catch(err) {
      console.log(err)
    }
  }))
}
