const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean
  },
  user_info: {
    type: String
  },
  user_web: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model('users', UserSchema)
