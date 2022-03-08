const express = require('express')
const app = express()

// 中间件
app.use(express.json())
app.use(require('cors')())
app.use('/uploads', express.static(__dirname + '/uploads'))

// 秘钥
app.set('sercret', 'hnskfhk23j4')

// admin路由
require('./routes/admin')(app)
// 数据库
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
