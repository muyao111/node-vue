const express = require('express')
const app = express()

// 中间件
app.use(express.json())
app.use(require('cors')())
// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/public/admin'))
app.use('/', express.static(__dirname + '/public/app'))

// 秘钥
app.set('sercret', 'hnskfhk23j4')

// 数据库
require('./plugins/db')(app)
// admin路由
require('./routes/admin')(app)
require('./routes/app')(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
