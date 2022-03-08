const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // 每个广告位都有几张轮播图，每张轮播图对应一个url地址
  items: [
    {
      image: { type: String }, // 轮播图
      url: { type: String }, // 点击轮播图跳转url地址
    },
  ],
})

module.exports = mongoose.model('Ad', schema)
