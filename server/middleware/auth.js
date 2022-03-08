module.exports = (options) => {
  const jwt = require('jsonwebtoken') // 返回token
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    console.log(req)
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()
    if (!token) return res.status(401).send({ message: 'token不存在，请先登录！' })
    // assert(token, 401, '请先登录')

    const { id } = jwt.verify(token, req.app.get('sercret'))
    if (!id) return res.status(401).send({ message: '无效的token！' })

    req.user = await AdminUser.findById(id)
    if (!req.user) return res.status(401).send({ message: '无效的token！' })
    await next()
  }
}
