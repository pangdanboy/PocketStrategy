const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create schema
const ArticleSchema = new Schema({
  // 文章id
  articleID: {
    type: String,
    required: true
  },
  // 文章标题
  title: {
    type: String,
    required: true
  },
  // 文章摘要
  abstract: {
    type: String,
    required: true
  },
  // 文章正文
  content: {
    type: String,
    required: true
  },
  // 文章封面
  cover: {
    type: String
  },
  // 文章创建日期
  date: {
    type: Date,
    default: Date.now
  },
  // 文章点赞数
  support: {
    type: Number,
    default: 0
  }
})

// eslint-disable-next-line no-undef
module.exports = Article = mongoose.model('articles', ArticleSchema)
