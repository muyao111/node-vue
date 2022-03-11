module.exports = (app) => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-app')

  // 全部引用一遍，测试js数据录入，防止报错
  require('require-all')(__dirname + '/../models')
}
