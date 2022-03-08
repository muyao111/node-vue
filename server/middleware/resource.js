module.exports = (options) => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource) // 小写复数 转成 大写单数
    req.Model = require(`../models/${modelName}`) // 导入model并挂载到req上
    next()
  }
}
