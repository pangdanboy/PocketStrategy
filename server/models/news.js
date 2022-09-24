const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create Schema
const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// eslint-disable-next-line no-undef
module.exports = News = mongoose.model('news', newsSchema)
