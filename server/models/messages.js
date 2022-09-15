const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create schema
const MessageSchema = new Schema({
  // 留言用户id
  user_id: {
    type: String
  },
  // 留言用户昵称
  user_name: {
    type: String
  },
  // 留言用户头像
  user_avatar: {
    type: String
  },
  // 留言内容
  messageContent: {
    type: String,
    required: true
  },
  // 留言创建日期
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-global-assign,no-undef
module.exports = Message = mongoose.model('messages', MessageSchema)
