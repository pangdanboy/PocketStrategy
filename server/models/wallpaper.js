const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create Schema
const wallpaperSchema = new Schema({
  // 图片地址
  url: {
    type: String,
    required: true
  },
  // 图片关键词(为后续分类或者搜索做准备)
  keyWord: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// eslint-disable-next-line no-undef
module.exports = Wallpaper = mongoose.model('wallpaper', wallpaperSchema)
