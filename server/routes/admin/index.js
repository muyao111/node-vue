module.exports = (app) => {
  const express = require('express')
  const router = express.Router()
  const multer = require('multer') // 处理图片上传

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
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
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

  // crud 中间件
  const crudMiddleWare = async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource) // 小写复数 转成 大写单数
    req.Model = require(`../../models/${modelName}`) // 导入model并挂载到req上
    next()
  }

  // restful 通用 crud 接口
  app.use('/admin/api/rest/:resource', crudMiddleWare, router)

  /****************************************************************************/

  // 图片上传 中间件
  const upload = multer({
    dest: __dirname + './../../uploads', // destination 目标地址
  })

  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
