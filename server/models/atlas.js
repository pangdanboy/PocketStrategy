const mongoose = require('mongoose')

const Schema = mongoose.Schema

// create Schema
const atlasSchema = new Schema({
  // 名称
  name: {
    type: String,
    required: true
  },
  // 封面
  cover: {
    type: String,
    required: true
  },
  // 背景故事
  story: {
    type: String,
    required: true
  },
  // 类型
  type: {
    type: String,
    required: true
  },
  // 定位
  position: {
    type: String,
    required: true
  },
  // 分类
  classify: {
    type: String,
    required: true
  },
  // 种族值
  race_value: {
    type: String,
    required: true
  },
  // 生命
  hp: {
    type: String,
    required: true
  },
  // 特攻
  special_attack: {
    type: String,
    required: true
  },
  // 物攻
  material_attack: {
    type: String,
    required: true
  },
  // 速度
  speed: {
    type: String,
    required: true
  },
  // 特防
  special_prevention: {
    type: String,
    required: true
  },
  // 物防
  material_prevention: {
    type: String,
    required: true
  },
  // 收集加成
  collect: {
    type: String,
    required: true
  },
  // 身高
  tall: {
    type: String,
    required: true
  },
  // 体重
  weight: {
    type: String,
    required: true
  },
  // 发布日期
  date: {
    type: Date,
    default: Date.now()
  }
})

// eslint-disable-next-line no-undef
module.exports = Atlas = mongoose.model('atlas', atlasSchema)
