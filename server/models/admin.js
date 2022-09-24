const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create Schema
const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // 管理员权限等级
  adminLevel: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// eslint-disable-next-line no-undef
module.exports = Admin = mongoose.model('admin', adminSchema)
