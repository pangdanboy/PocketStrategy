const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create schema
const CommentSchema = new Schema({
  // 评论文章id
  articleID: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  // 评论用户昵称，每次通过user_id获取最新的用户信息
  user_name: {
    type: String
  },
  // 评论用户头像
  user_avatar: {
    type: String
  },
  // 评论内容
  commentContent: {
    type: String,
    required: true
  },
  // 评论创建日期
  date: {
    type: Date,
    default: Date.now
  }
})

// eslint-disable-next-line no-global-assign
module.exports = Comment = mongoose.model('comments', CommentSchema)
