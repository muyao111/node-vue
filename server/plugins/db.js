module.exports = (app) => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.q:27017/node-vue-app')
}
