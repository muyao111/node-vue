module.exports = (app) => {
  const express = require('express')
  const router = express.Router()
  const multer = require('multer') // 处理图片上传
  const jwt = require('jsonwebtoken') // 返回token
  // const assert = require('http-assert') // 抛出错误

  const AdminUser = require('../../models/AdminUser')

  /************************* 通用crud ****************************/

  // auth 中间件
  const authMiddleWare = require('../../middleware/auth')
  // crud 中间件
  const crudMiddleWare = require('../../middleware/resource')

  // create 一条数据
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // retrieve 多条数据
  router.get('/', async (req, res) => {
    // 既要满足通用性，也要满足扩展性
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // retrieve by _id
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // update by _id
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // delete by _id
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: 'true',
    })
  })

  // restful 通用 crud 接口
  app.use('/admin/api/rest/:resource', authMiddleWare(), crudMiddleWare(), router)

  /************************* 图片上传 ****************************/

  // 图片上传 中间件
  const upload = multer({
    dest: __dirname + './../../uploads', // destination 目标地址
  })

  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  /************************* 登录接口 ****************************/

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) return res.status(422).send({ message: '用户名不存在！' })

    const isValid = require('bcryptjs').compareSync(password, user.password)
    if (!isValid) return res.status(422).send({ message: '密码错误！' })

    const token = jwt.sign({ id: user._id }, app.get('sercret'))
    res.send({ token })
  })

  /***********/

  app.use(async (err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message })
  })
}
