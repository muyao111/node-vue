const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, // 默认编辑时不查出密码，防止被二次散列
    set(val) {
      return require('bcryptjs').hashSync(val, 10) // 散列密码
    },
  },
})

module.exports = mongoose.model('AdminUser', schema)
